import { Injectable } from '@nestjs/common';
import { gql } from "@apollo/client";
import redis from 'redis'
import { createClient } from 'redis';
import { ApolloClient, InMemoryCache,HttpLink } from "@apollo/client";
@Injectable()
export class VendureTestService {

    async fetchNormalData(){
        
        const client = new ApolloClient({
          link: new HttpLink({ uri: 'https://admin.menzz.co/shop-api', fetch }),
            cache: new InMemoryCache(),
        });
        const { data } = await client.query({
            query: gql`
            query{
                products(options:{
                  skip:0
                  
                }){
                  items{
                    id
                    createdAt
                    updatedAt
                    languageCode
                    name
                    slug
                    description
                    
                  }
                }
              }
            `,
          });  
          const resp=data.products.items
          return resp.map((product)=>{
            return product
          })
    }
    async fetchDataFromStellate(){
        const client = new ApolloClient({
            link: new HttpLink({ uri: 'https://admin.menzz.co/shop-api', fetch }),
            cache: new InMemoryCache(),
        });
        const { data } = await client.query({
            query: gql`
            query{
              products(options:{
                skip:0
                
              }){
                items{
                  id
                  createdAt
                  updatedAt
                  languageCode
                  name
                  slug
                  description
                  
                }
              }
            }
            `,
          });  
          const resp=data.products.items
          return resp.map((product)=>{
            return product
          })
    }
    
    async fetchDataFromStellatewithRedis(){
       
       
      const clientR = createClient();
      clientR.on('error', err => console.log('Redis Client Error', err));

      await clientR.connect();
      
     
      let respo1=await clientR.get("dataTest1");
      if(respo1){
        
       return respo1
  }

      
      else{
        const client = new ApolloClient({
          link: new HttpLink({ uri: 'https://admin.menzz.co/shop-api', fetch }),
          cache: new InMemoryCache(),
      });
      const { data } = await client.query({
          query: gql`
          query{
              products(options:{
                skip:0
              }){
                items{
                  id
                  createdAt
                  updatedAt
                  languageCode
                  name
                  slug
                  description
                  
                }
              }
            }
          `,
        });  
        console.log("Else part Hit")
        const resp=data.products.items
        
        const x=await clientR.set('dataTest1',JSON.stringify(resp));
        console.log()
        return resp.map((product)=>{
          return product
        })
      }
      
    }
       
        

}
