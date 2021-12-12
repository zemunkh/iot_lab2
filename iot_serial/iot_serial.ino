#include <DHT.h>
#include <DHT_U.h>
#include <ArduinoJson.h>

#define LEDPIN 2
#define DHTPIN 14
#define DHTTYPE    DHT22 


DHT dht(DHTPIN, DHTTYPE);
float hum;
float temp;
bool status = false;
void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(LEDPIN, OUTPUT); 
  Serial.println("Serial started!");

}

void loop() {
  // put your main code here, to run repeatedly:

    hum = dht.readHumidity();
    temp= dht.readTemperature();
    //Print temp and humidity values to serial monitor

//    StaticJsonDocument<40> document;
//    document["temp"] = temp;
//    document["hum"] = hum;
//    
//    char buffer[40];
//    serializeJson(document, buffer);
//     Serial.print(buffer);
    
//    Serial.print("Humidity: ");
    Serial.print(hum);
    Serial.print(",");
    Serial.print(temp);
    Serial.println("\n");
   
    if(status == true) {
      digitalWrite(LEDPIN, HIGH);
      status = false;
    } else {
      digitalWrite(LEDPIN, LOW);
      status = true;
    }
    
    delay(2000); //Delay 2 sec.
}
// pass: @8765432 user: zemunkh@gmail.com
