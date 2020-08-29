#include <ArduinoJson.h>
 
#include <Arduino.h>
#include <ESP8266WiFi.h> 
#include <ESP8266WiFiMulti.h>
 
#include <WebSocketsClient.h>
 
#include <Hash.h>
 
ESP8266WiFiMulti WiFiMulti;
WebSocketsClient webSocket;
 
 
//const char* msg =  "{\"message\":\"this is for nodemcu\"}";
String really;
String device_name =  "Sam_NodeMCU";
 
StaticJsonDocument<256> doc;
//#define USE_SERIAL Serial1

//MOTOR A
int motor_1a =5;
int motor_1b = 4;

//MOTOR B
int motor_2a = 2;
int motor_2b = 14; 
 
 
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
      if ( Element == "Forward" && Data == "1")
      {
     forward();
 
      }
      else if(Element == "Forward" && Data == "0")
      {
        stp();
      }

          if ( Element == "Left" && Data == "1")
      {
     pivturn_left();
 
      }
      else if(Element == "Left" && Data == "0")
      {
        stp();
      }

       if ( Element == "Right" && Data == "1")
      {
     pivturn_right();
 
      }
      else if(Element == "Right" && Data == "0")
      {
        stp();
      }

       if ( Element == "Back" && Data == "1")
      {
     back();
 
      }
      else if(Element == "Back" && Data == "0")
      {
        stp();
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
 
  pinMode(5, OUTPUT);
pinMode(4, OUTPUT);
pinMode(2, OUTPUT);
pinMode(14, OUTPUT);
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
 
 WiFiMulti.addAP("Frigo Internet", "Zivl2308");
  //WiFiMulti.addAP("Galaxy A017411", "00000000");
//WiFiMulti.addAP("MobileWiFi-8b66", "16416542");
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


void pivturn_right(){
  digitalWrite(motor_1a, HIGH);
   digitalWrite(motor_1b, HIGH);
    digitalWrite(motor_2a, LOW);
     digitalWrite(motor_2b, LOW);
  }


void pivturn_left(){
  digitalWrite(motor_1a,LOW);
   digitalWrite(motor_1b, LOW);
    digitalWrite(motor_2a, HIGH);
     digitalWrite(motor_2b,HIGH);
  }  

void forward(){
  digitalWrite(motor_1a,HIGH);
   digitalWrite(motor_1b, LOW);
    digitalWrite(motor_2a, HIGH);
     digitalWrite(motor_2b, LOW);
  }    

void back(){
  digitalWrite(motor_1a,LOW);
   digitalWrite(motor_1b, HIGH);
    digitalWrite(motor_2a, LOW);
     digitalWrite(motor_2b, HIGH);
  }      
  
void stp(){
  digitalWrite(motor_1a,LOW);
   digitalWrite(motor_1b, LOW);
    digitalWrite(motor_2a, LOW);
     digitalWrite(motor_2b, LOW);
  }      
