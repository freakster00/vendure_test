import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets/decorators';
import {Server,Socket} from 'socket.io'
@WebSocketGateway(
  {
    cors:{
      origin:'*',
    }
  }
)
export class MessagesGateway {
  @WebSocketServer()
  server:Server;

  constructor(private readonly messagesService: MessagesService) {}

  private rooms={}
  //Chat 
  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    console.log(createMessageDto)
    const message= await this.messagesService.create(createMessageDto);
   
  this.server.emit('message',message)
    return message
   
  }

 

  
  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name:string,
    @ConnectedSocket() client:Socket
    ) {
   return this.messagesService.identify(name,client.id)
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping:boolean,
    @ConnectedSocket() client:Socket
  ) {
    const name= await this.messagesService.getClientName(client.id)
    client.broadcast.emit('typing',{
      name,
      isTyping
    })
  }
  @SubscribeMessage('connection')
  check_connection(
    @MessageBody('name') name:string,
    @ConnectedSocket() client:Socket
    ) {
   console.log("connection Hit")
  }


  //Video Call
  @SubscribeMessage('connection')
 streamVideoCall(@ConnectedSocket() client:Socket){
  client.on("join room",roomId=>{

    if(this.rooms[roomId]){
      //Inserting socket id of another client with similar room id into the room object with a key of roomId which is basically a array of socket id.
      this.rooms[roomId].push(client.id)
    }
    else{
      //Creating a key called roomId inside room object and creating a array as a value for roomID key with initial value of socket id.
      this.rooms[roomId]=[client.id]
    }

      const anotherConnectedUser=this.rooms[roomId].find(id=>id!=client.id)    
      if(anotherConnectedUser){
        client.emit("Another Connected User",anotherConnectedUser)
        client.to(anotherConnectedUser).emit("User Joined",client.id)
      }
  })
 //Sending Offer
  client.on("offer",payload=>{
    this.server.to(payload.target).emit("offer",payload)
  })

  //Sending Answer
  client.on("answer",payload=>{
    this.server.to(payload.target).emit("answer",payload)
  })
    //Web-RTC Handshake 
  client.on("ice-candidate",incoming=>{
    this.server.to(incoming.target).emit("ice-candidate",incoming.candidate)
  })

 }

}
