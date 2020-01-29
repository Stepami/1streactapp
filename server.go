package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

// Setup describes server config (struct)
type Setup struct {
	Port    int    `json:"port"`
	DistDir string `json:"distDir"`
}

func main() {
	var setup Setup
	// открытие JSON файла конфигурации
	jsonFile, err := os.Open("setup.json")
	if err != nil {
		fmt.Println(err)
	}
	defer jsonFile.Close()
	// считывание информации из файла в массив байтов
	byteValue, _ := ioutil.ReadAll(jsonFile)
	// десериализация JSON строки в экземпляр структуры
	json.Unmarshal(byteValue, &setup)
	// содержимое директории "dist" по запросам "/"
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir(fmt.Sprintf("./%s", setup.DistDir)))))
	// содержимое папки node_modules
	http.Handle("/node_modules/", http.StripPrefix("/node_modules/", http.FileServer(http.Dir("./node_modules"))))
	// запуск сервера
	err = http.ListenAndServe(fmt.Sprintf(":%d", setup.Port), nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
