const int LED = 13;

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
  	int cmd = Serial.read();
  	if (cmd == 0) {
  		digitalWrite(LED, LOW); 
  	}
  	else {
  		digitalWrite(LED, HIGH); 
  	}
  }
}
