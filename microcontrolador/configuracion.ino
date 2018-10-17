
// //Lee las configuraciones de la memoria eeprom y almacenarlas en las variables
void readConfig(){
    Serial.println("Leyendo configuration de la EEPROM");
    readEspSSID();
    readEspPass();
    readInetSSID();
    readInetPass();
    readDataServer();
    idSensor = (long)ESP.getChipId();
}

//Lee el SSID del access point que da acceso a internet de la memoria eeprom y lo almacena en la variable correspondiente,
// si no había dato guardado escribe un String vacío en la eeprom y en la variable para no leer basura de la memoria e intentar conectarse
int readInetSSID(){
    int result;
    result = readFromEEPROM(INET_SSID_ADDRESS, INET_SSID_SIZE, inetSSID);
    if (result == 1){ //Si no había una configuración guardada escribir un String vacío para evitar leer basura de la memoria
        Serial.println("No encontrado en EEPROM espPass, guardando...");
        String("").toCharArray(inetSSID, INET_SSID_SIZE);
        Serial.println("Preparando para escribir inetSSID: " + String(inetSSID));
        writeToEEPROM(INET_SSID_ADDRESS, INET_SSID_SIZE, inetSSID); 
    }
}

// Guarda el SSID del access point que da acceso a internet en la variable inetSSID y lo escribe en la memoria eeprom
int writeInetSSID(String data){
    Serial.println("Escribiendo en EEPROM inetSSID");
    data.toCharArray(inetSSID, INET_SSID_SIZE);
    writeToEEPROM(INET_SSID_ADDRESS, INET_SSID_SIZE, inetSSID); 

}
int readInetPass(){
    int result;
    result = readFromEEPROM(INET_PASS_ADDRESS, INET_PASS_SIZE, inetPass);
    if (result == 1){
        Serial.println("No encontrado en EEPROM espPass, guardando...");
        String("").toCharArray(inetPass, INET_PASS_SIZE);
        Serial.println("Preparando para escribir espPass: " + String(inetPass));
        writeToEEPROM(INET_PASS_ADDRESS, INET_PASS_SIZE, inetPass); 
    }
    
}

int writeInetPass(String data){
    Serial.println("Escribiendo en EEPROM inetPass");
    data.toCharArray(inetPass, INET_PASS_SIZE);
    writeToEEPROM(INET_PASS_ADDRESS, INET_PASS_SIZE, inetPass); 
}
int readEspSSID(){
    int result;
    result = readFromEEPROM(ESP_SSID_ADDRESS, ESP_SSID_SIZE, espSSID);
    if (result == 1){
        Serial.println("No encontrado en EEPROM espSSID, guardando...");
        String("Centinela").toCharArray(espSSID, ESP_SSID_SIZE);
        Serial.println("Preparando para escribir espSSID: " + String(espSSID));
        Serial.println(" que tiene tamanio " + String(ESP_SSID_SIZE) + " En la direccion " + String(ESP_SSID_ADDRESS));
        writeToEEPROM(ESP_SSID_ADDRESS, ESP_SSID_SIZE, espSSID); 
    }
}

int writeEspSSID(String data){
    Serial.println("Escribiendo en EEPROM espSSID");
    data.toCharArray(espSSID, ESP_SSID_SIZE);
    writeToEEPROM(ESP_SSID_ADDRESS, ESP_SSID_SIZE, espSSID); 

}
int readEspPass(){
    int result;
    result = readFromEEPROM(ESP_PASS_ADDRESS, ESP_PASS_SIZE, espPass);
    if (result == 1){
        Serial.println("No encontrado en EEPROM espPass, guardando...");
        String("centinela1234").toCharArray(espPass, ESP_PASS_SIZE);
        Serial.println("Preparando para escribir espPass: " + String(espPass));
        writeToEEPROM(ESP_PASS_ADDRESS, ESP_PASS_SIZE, espPass); 
    }
    
}

int writeEspPass(String data){
    Serial.println("Escribiendo en EEPROM espPass");
    data.toCharArray(espPass, ESP_PASS_SIZE);
    writeToEEPROM(ESP_PASS_ADDRESS, ESP_PASS_SIZE, espPass); 
}

int readDataServer(){
    int result;
    result = readFromEEPROM(SERVER_ADDRESS, SERVER_SIZE, dataServer);
    if (result == 1){
        Serial.println("No encontrado en EEPROM dataServer, guardando...");
        String("http://142.93.207.46/registro.php").toCharArray(dataServer, SERVER_SIZE); //Si no había dato en la memoria eeprom escribir el servidor por default
        Serial.println("Preparando para escribir espPass: " + String(dataServer));
        writeToEEPROM(SERVER_ADDRESS, SERVER_SIZE, dataServer); 
    }
}

int writeDataServer(String data){
    Serial.println("Escribiendo en EEPROM dataServer");
    data.toCharArray(dataServer, SERVER_SIZE);
    writeToEEPROM(SERVER_ADDRESS, SERVER_SIZE, dataServer); 
    
}

