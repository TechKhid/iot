#include <ArduinoJson.h>


#include <Arduino.h>
#include <ESP8266WiFi.h> 
#include <ESP8266WiFiMulti.h>

#include <WebSocketsClient.h>

#include <Hash.h>

ESP8266WiFiMulti WiFiMulti;
WebSocketsClient webSocket;


String really;
String device_name =  " Trevillion_NodeMCU";

StaticJsonDocument<256> doc;
//#define USE_SERIAL Serial1
int light = 13;


void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {

  switch(type) {
    case WStype_DISCONNECTED:{
      Serial.printf("[WSc] Disconnected!\n");
     String device_name_send =  "{\"de_device\": \"" + device_name + "\" }";
      webSocket.sendTXT(device_name_send);
    }
      break;
    case WStype_CONNECTED: {
      Serial.printf("[WSc] Connected to url: %s\n", payload);

      // send message to server when Connected
     // webSocket.sendTXT(msg);
     
     String device_name_send =  "{\"device\": \"" + device_name + "\" }";
      webSocket.sendTXT(device_name_send);
    
    }
      break;
    case WStype_TEXT:
    {
      Serial.printf("[WSc] get text: %s\n", payload);
      really = (char * )payload;
      
      DeserializationError err = deserializeJson(doc,really);
      if(err)
      {
        Serial.println(err.c_str());
        return;
      }

      String Element = doc["Element"];
      String Data = doc["Data"];
      
      ////Serial.println(Element);
      /////Serial.println(Data);
      if ( Element == "Switch_1" && Data == "1")
      {
        digitalWrite(light,HIGH);
      }
      else if(Element == "Switch_1" && Data == "0")
      {
        
        digitalWrite(light,LOW);
      }
      
 // Serial.println(really);
      // send message to server
      //webSocket.sendTXT("message here");
       // webSocket.sendTXT(msg);
    }
      break;
    case WStype_BIN:
      Serial.printf("[WSc] get binary length: %u\n", length);
      hexdump(payload, length);

      // send data to server
      // webSocket.sendBIN(payload, length);
      break;
        case WStype_PING:
            // pong will be send automatically
            Serial.printf("[WSc] get ping\n");
            break;
        case WStype_PONG:
            // answer to a ping we send
            Serial.printf("[WSc] get pong\n");
            break;
    }

}

void setup() {

  pinMode(light, OUTPUT);
 
  // USE_SERIAL.begin(19200);
   Serial.begin(115200);

  //Serial.setDebugOutput(true);
//  USE_SERIAL.setDebugOutput(true);

  Serial.println();
  Serial.println();
  Serial.println();

  for(uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

WiFiMulti.addAP("MobileWiFi-8b66", "-----------");
  //WiFi.disconnect();
  while(WiFiMulti.run() != WL_CONNECTED) {
    delay(100);
  }

  // server address, port and URL
  webSocket.begin("20.37.247.107", 80 , "/ws/hello/");

  // event handler
  webSocket.onEvent(webSocketEvent);

  // use HTTP Basic Authorization this is optional remove if not needed

  // try ever 5000 again if connection has failed
  webSocket.setReconnectInterval(5000);
  
  // start heartbeat (optional)
  // ping server every 15000 ms
  // expect pong from server within 3000 ms
  // consider connection disconnected if pong is not received 2 times
  webSocket.enableHeartbeat(15000, 3000, 2);


}

void loop() {
  delay(500);
  webSocket.loop();
}
