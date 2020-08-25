import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ioTConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.project_ = self.scope['url_route']['kwargs']['project']
        self.project_name = 'project_%s' % self.project_

        # Join project
        await self.channel_layer.group_add(
            self.project_name,
            self.channel_name
        )

        await self.accept()

        # Send message to current project
        """
        if (event):
            print(event)
        await self.channel_layer.group_send(
            self.project_name,
            {
                'type': 'chas_message',
                'device': "sfsdfsd"
            }
        )

    # Receive message from current project  
    async def chas_message(self, event):
        message = event['message']
        print(message)
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': "connected"
        }))
    """

    async def disconnect(self, close_code):
        # Leave project
        await self.channel_layer.group_discard(
            self.project_name,
            self.channel_name
        )


#########################
#############################
#############################

    # Receive message from WebSocket
    async def receive(self, text_data):
        
        #Loading received data
        
        #print(text_data)
        text_data_json = json.loads(text_data)

        #setting received type  to null
        
        try:
            message_type = text_data_json['msg_type']
            
            #setting incoming 
            receive_type = message_type
            incoming_element = text_data_json['element_name']
            incoming_data = text_data_json['element_data']
            message = {"incoming_element":incoming_element,"incoming_data":incoming_data,"receive_type":receive_type}


        except:
            pass
        try:
            message_type = text_data_json['device']
            receive_type = "device"
            message = {"receive_type":receive_type,"device_name":message_type}
        except:
            pass

        #print(message)
        
        # Send message to current project  
        await self.channel_layer.group_send(
            self.project_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from current project  
    async def chat_message(self, event):
        message = event['message']
        

        try :
            if(message["receive_type"] =="device"):  
         # Send message to WebSocket
        
                await self.send(text_data=json.dumps({
                'device': message["device_name"]
                }))
        except:
            pass
        
        try:  
            if(message["receive_type"] =="data_send"):

                await self.send(text_data=json.dumps({
                'Element': message["incoming_element"],
                'Data':message["incoming_data"]
                }))
        except:
            pass
        
 

        # Send message to WebSocket
        

