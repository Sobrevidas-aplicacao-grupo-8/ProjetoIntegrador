package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// Paciente representa um paciente com nome e data de cadastro
type Paciente struct {
	Nome         string    `json:"nome"`
	DataCadastro time.Time `json:"data_cadastro"`
}

// Cria um slice de pacientes pré-definidos
func criarPacientes() []Paciente {
	pacientes := []Paciente{
		{"Ana Silva Sauro Pereira", time.Date(2023, time.March, 1, 0, 0, 0, 0, time.UTC)},
		{"Bruno Souza", time.Date(2023, time.March, 2, 0, 0, 0, 0, time.UTC)},
		{"Carlos Lima", time.Date(2023, time.March, 3, 0, 0, 0, 0, time.UTC)},
		{"Daniela Castro", time.Date(2023, time.March, 4, 0, 0, 0, 0, time.UTC)},
		{"Eduardo Santos", time.Date(2023, time.March, 5, 0, 0, 0, 0, time.UTC)},
		{"Fernanda Almeida", time.Date(2023, time.March, 6, 0, 0, 0, 0, time.UTC)},
		{"Gabriel Costa", time.Date(2023, time.March, 7, 0, 0, 0, 0, time.UTC)},
		{"Heloisa Ferreira", time.Date(2023, time.March, 8, 0, 0, 0, 0, time.UTC)},
		{"Igor Martins", time.Date(2023, time.March, 9, 0, 0, 0, 0, time.UTC)},
		{"Julia Pereira", time.Date(2023, time.March, 10, 0, 0, 0, 0, time.UTC)},
		{"Karen Oliveira", time.Date(2023, time.March, 11, 0, 0, 0, 0, time.UTC)},
		{"Lucas Ribeiro", time.Date(2023, time.March, 12, 0, 0, 0, 0, time.UTC)},
		{"Mariana Cunha", time.Date(2023, time.March, 13, 0, 0, 0, 0, time.UTC)},
		{"Nicolas Dias", time.Date(2023, time.March, 14, 0, 0, 0, 0, time.UTC)},
		{"Olivia Melo", time.Date(2023, time.March, 15, 0, 0, 0, 0, time.UTC)},
		{"Pedro Alves", time.Date(2023, time.March, 16, 0, 0, 0, 0, time.UTC)},
		{"Quintino Barbosa", time.Date(2023, time.March, 17, 0, 0, 0, 0, time.UTC)},
		{"Raquel Lima", time.Date(2023, time.March, 18, 0, 0, 0, 0, time.UTC)},
		{"Sofia Duarte", time.Date(2023, time.March, 19, 0, 0, 0, 0, time.UTC)},
		{"Tiago Souza", time.Date(2023, time.March, 20, 0, 0, 0, 0, time.UTC)},
	}
	return pacientes
}

// Handler para o endpoint /pacientes
func pacientesHandler(w http.ResponseWriter, r *http.Request) {
	pacientes := criarPacientes()
	w.Header().Set("Content-Type", "application/json")
	// Habilitando CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	json.NewEncoder(w).Encode(pacientes)
}

func main() {
	http.HandleFunc("/pacientes", pacientesHandler)
	fmt.Println("Servidor rodando na porta 8080")
	http.ListenAndServe(":8080", nil)
}
