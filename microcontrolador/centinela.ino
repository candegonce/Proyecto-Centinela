#include <DNSServer.h>

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
//#include <DNSServer.h>
#include <ESP8266mDNS.h>
#include <EEPROM.h>
#include <ESP8266HTTPClient.h>
#include <SoftwareSerial.h>

#define DEBUG(x) Serial.println (x)
//#define DEBUG(x) 



// tamaño y direcciones en las cuales se van a guardar los datos de configuracion en la memoria eeprom. Despues de 
// cada dato se dejan 3 bytes para guardar el string OK ('O', 'K' y '\0') para verificar al leer si hay un dato guardado o no.
#define ESP_SSID_ADDRESS 0 // direccion en la memoria EEPROM en la que se guardara la SSID del Soft Acces Point de la ESP8266
#define ESP_SSID_SIZE 32 // tamaño en bytes de la SSID del Soft Acces Point de la ESP8266
#define ESP_PASS_ADDRESS ESP_SSID_ADDRESS + ESP_SSID_SIZE + 3// direccion en la memoria EEPROM en la que se guardara el password del Soft Acces Point de la ESP8266
#define ESP_PASS_SIZE 32 // tamaño en bytes de la SSID del password del Soft Acces Point de la ESP8266
#define INET_SSID_ADDRESS ESP_PASS_ADDRESS + ESP_PASS_SIZE + 3 // direccion en la memoria EEPROM en la que se guardara la SSID del Acces Point que da acceso a internet
#define INET_SSID_SIZE 32 // tamaño en bytes de la SSID del Acces Point que da acceso a internet
#define INET_PASS_ADDRESS INET_SSID_ADDRESS + INET_SSID_SIZE + 3// direccion en la memoria EEPROM en la que se guardara el password del Acces Point que da acceso a internet
#define INET_PASS_SIZE 32 // tamaño en bytes del password del Acces Point que da acceso a internet
#define SERVER_ADDRESS INET_PASS_ADDRESS + INET_PASS_SIZE + 3 // direccion en la memoria EEPROM en la que se guardara la direccion del servidor de datos
#define SERVER_SIZE 128 // tamaño en bytes de la SSID la direccion del servidor de datos

SoftwareSerial co2UART(2 ,15); //rx tx

//variables que almacenan los datos de configuracion leidos o a escribir en la memoria eeprom
char espSSID[ESP_SSID_SIZE];
char espPass[ESP_PASS_SIZE];
char inetSSID[INET_SSID_SIZE];
char inetPass[INET_PASS_SIZE];
char dataServer[SERVER_SIZE];

long idSensor; //id del ESP8266
int tmpValue; // lectura de la temperatura
int co2Value; // lectura de concentracion de CO2

unsigned long timeLastRead; // tiempo en que se realizó la última lectura de datos del sensor  
unsigned long currentTime; // tiempo actual, se utiliza para comparar con la última lectura y verificar si transcurrió el tiempo estipulado para leer nuevamente
unsigned long period = 10000;  // tiempo de espera entre lecturas del sensor

ESP8266WebServer server(80); // http server montado en la ESP8266 para ver y modificar las configuraciones

//código que se ejecuta una vez al encender el dispositivo para realizar las configuraciones iniciales
void setup() {
    Serial.begin(115200); //Se inicializa el puerto serie para conectar a la pc y realizar la depuracion
    
    co2UART.begin(9600); //Se inicializa la conexion serial con el sensor de CO2
    delay(3000);
    
    readConfig(); //Leer las configuraciones de la memoria eeprom y almacenarlas en las variables
    
    startSoftAp(); // Iniciar el access point de la ESP8266 para conectarse cuando ésta no esta conectada al access point de conexión a internet
    delay(3000);
    startWebServer(); // Iniciar el web server montado en la ESP8266
    connectToWifi(); // Conectarse al access point que da conexión a internet
    startMdns("centinela"); // iniciar multicast dns para conectarse al dispositivo mediante la direccion centinela.local
    currentTime = millis(); // inicializar el tiempo para comparar con el tiempo de la última lectura
}

void loop() {
    server.handleClient(); // Verificar si se recibieron http request
    currentTime = millis();
    if (currentTime - timeLastRead >= period){
        if (WiFi.status() == WL_CONNECTED){
            Serial.println(WiFi.localIP());
            if (readSensor()){
                sendDataToServer();
            }
            timeLastRead = currentTime;
            Serial.println(ESP.getFreeHeap());
        }
    }
}

// Inicializa el access point incorporado en la ESP8266 al cual conectarse para las configuraciones iniciales
int startSoftAp(){
    WiFi.softAP(espSSID, espPass);
}

// Conecta a la red inalambrica que da acceso a internet. Si en 30 segundos no se conectó deja de intentar
int connectToWifi(){

    DEBUG("Conectando a WiFi");
    //Serial.print("Connecting to ");
    //Serial.println(inetSSID);
    WiFi.disconnect();
    WiFi.begin(inetSSID, inetPass);
    /*
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
        tries++;
        if (tries > 60) break;
    }
    Serial.println("");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    */
}

// iniciar multicast dns para conectarse al dispositivo mediante la direccion centinela.local
int startMdns(const char * ns){
        if (MDNS.begin(ns)) {             
    Serial.println("mDNS responder started");
  } else {
    Serial.println("Error setting up MDNS responder!");
  }
}


