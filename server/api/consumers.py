# from channels import Group

# def ws_connect(message):
#     Group('users').add(message.reply_channel)


# def ws_disconnect(message):
#     Group('users').discard(message.reply_channel) 

# attempt 2

# import json
# from channels.generic.websocket import WebsocketConsumer

# class BidConsumer(WebsocketConsumer):
#     def connect(self):
#         self.accept()
#         self.send(text_data=json.dumps({
#             'type': 'connection_established',
#             'message': 'You are now connected!'
#         }))

import asyncio
import json
from channels.consumer import AsyncConsumer

class BidConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        print('connected', event)
        await self.send({
            "type": "websocket.accept"
        })



