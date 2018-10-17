

// Escribe datos en la EEPROM y al final escribe un string "OK" ('O', 'K' y '\0') para verificar al leer si hay un dato escrito previamente
int writeToEEPROM(int address, int dataSize, char * data){
    EEPROM.begin(512);
    Serial.print("Escribiendo en la EEPROM");
    for (int i = 0; i < dataSize; i++){
        Serial.print(String(data[i]));
        EEPROM.write(i + address, data[i]);
        //delay(100);
    }
    //
    EEPROM.write(address + dataSize, 'O');
    EEPROM.write(address + dataSize + 1, 'K');
    EEPROM.write(address + dataSize + 2, '\0');
    EEPROM.commit();
    EEPROM.end();
    return 0;
}

//Lee datos de la EEPROM, si no hay dato guardado previamente devuelve 1, si hay dato lo almacena en data y devuelve 0
int readFromEEPROM(int address, int dataSize, char * data){
    EEPROM.begin(512);
    Serial.print("Leyendo de la EEPROM ");
    char result[3];
    EEPROM.get(address + dataSize, result);
    Serial.println(result);
    if (String(result) == "OK"){
        for (int i = 0; i < dataSize; i++){
            data[i] = EEPROM.read(i + address);
            Serial.print(data[i]);
            //delay(500);
        }
        EEPROM.end();
        return 0;
    } else {
        EEPROM.end();
        return 1;
    }
}


