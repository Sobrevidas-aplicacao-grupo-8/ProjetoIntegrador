package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

const (
	host     = "monorail.proxy.rlwy.net"
	port     = 19413
	user     = "postgres"
	password = "apdDfNTgAlMRpNuRbtUHzXKuQoUSbizr"
	dbname   = "railway"
)

var db *sql.DB

func init() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	var err error
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Conexão com o banco de dados estabelecida com sucesso!")
}

type Usuario struct {
	Email    string `json:"email"`
	CPF      string `json:"cpf"`
	Telefone string `json:"telefone"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Paciente struct {
	Nome               string `json:"nome"`
	CPF                string `json:"cpf"`
	DataNascimento     string `json:"data_nascimento"`
	Sexo               string `json:"sexo"`
	Telefone           string `json:"telefone"`
	Email              string `json:"email"`
	NomeMae            string `json:"nome_mae"`
	CEP                string `json:"cep"`
	Estado             string `json:"estado"`
	Cidade             string `json:"cidade"`
	Endereco           string `json:"endereco"`
	HomemMaiorQuarenta bool   `json:"homem_maior_quarenta"`
	Etilista           bool   `json:"etilista"`
	LesaoSuspeita      bool   `json:"lesao_suspeita"`
	Tabagista          bool   `json:"tabagista"`
	DataCadastro       string `json:"data_cadastro"`
	Microarea          string `json:"microarea"`
	Encaminhado        bool   `json:"encaminhado"`
}

func enableCORS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}
}

func CriarUsuario(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var usuario Usuario
	err := json.NewDecoder(r.Body).Decode(&usuario)
	if err != nil {
		http.Error(w, "Erro ao processar o JSON", http.StatusBadRequest)
		return
	}

	sqlStatement := `
	INSERT INTO usuarios (email, password, cpf, telefone, username)
	VALUES ($1, $2, $3, $4, $5)`

	_, err = db.Exec(sqlStatement, usuario.Email, usuario.Password, usuario.CPF, usuario.Telefone, usuario.Username)
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao inserir dados no banco de dados: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func Login(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var credentials struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		http.Error(w, "Erro ao processar o JSON", http.StatusBadRequest)
		return
	}

	var storedPassword string
	err = db.QueryRow("SELECT password FROM usuarios WHERE email = $1", credentials.Email).Scan(&storedPassword)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Email não encontrado", http.StatusUnauthorized)
		} else {
			http.Error(w, fmt.Sprintf("Erro ao buscar dados no banco de dados: %v", err), http.StatusInternalServerError)
		}
		return
	}

	if credentials.Password != storedPassword {
		http.Error(w, "Senha incorreta", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func CadastrarPacientes(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var paciente Paciente
	err := json.NewDecoder(r.Body).Decode(&paciente)
	if err != nil {
		http.Error(w, "Erro ao processar o JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	sqlStatement := `
	INSERT INTO pacientes (nomepaciente, cpf, nascimento, sexo, telefone, email, nomemae, cep, estado, cidade, endereco, "40anos", etilista, lesao, tabagista, cadastro, microarea)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`

	_, err = db.Exec(sqlStatement, paciente.Nome, paciente.CPF, paciente.DataNascimento, paciente.Sexo, paciente.Telefone, paciente.Email, paciente.NomeMae, paciente.CEP, paciente.Estado, paciente.Cidade, paciente.Endereco, paciente.HomemMaiorQuarenta, paciente.Etilista, paciente.LesaoSuspeita, paciente.Tabagista, paciente.DataCadastro, paciente.Microarea)
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao inserir dados no banco de dados: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Paciente cadastrado com sucesso"})
}

func ListarNomesEDatasPacientes(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)

	rows, err := db.Query("SELECT nomepaciente, nascimento FROM pacientes")
	if err != nil {
		log.Printf("Erro ao executar consulta SQL: %v", err)
		http.Error(w, fmt.Sprintf("Erro ao buscar nomes e datas dos pacientes: %v", err), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type NomeDataPaciente struct {
		Nome           string `json:"nome"`
		DataNascimento string `json:"data_nascimento"`
	}

	var pacientes []NomeDataPaciente
	for rows.Next() {
		var paciente NomeDataPaciente
		err := rows.Scan(&paciente.Nome, &paciente.DataNascimento)
		if err != nil {
			log.Printf("Erro ao ler dados do paciente: %v", err)
			http.Error(w, fmt.Sprintf("Erro ao ler dados do paciente: %v", err), http.StatusInternalServerError)
			return
		}
		pacientes = append(pacientes, paciente)
	}

	if err := rows.Err(); err != nil {
		log.Printf("Erro nos resultados do banco de dados: %v", err)
		http.Error(w, fmt.Sprintf("Erro nos resultados do banco de dados: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(pacientes)
	if err != nil {
		log.Printf("Erro ao codificar resposta JSON: %v", err)
		http.Error(w, fmt.Sprintf("Erro ao codificar resposta JSON: %v", err), http.StatusInternalServerError)
		return
	}
}

func ListarPacientesEncaminhados(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)

	rows, err := db.Query("SELECT nomepaciente FROM pacientes WHERE encaminhado = true")
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao buscar pacientes encaminhados: %v", err), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	type PacienteEncaminhado struct {
		Nome string `json:"nome"`
	}
	var pacientes []PacienteEncaminhado

	for rows.Next() {
		var paciente PacienteEncaminhado
		err := rows.Scan(&paciente.Nome)
		if err != nil {
			http.Error(w, fmt.Sprintf("Erro ao ler nome do paciente: %v", err), http.StatusInternalServerError)
			return
		}
		pacientes = append(pacientes, paciente)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, fmt.Sprintf("Erro nos resultados do banco de dados: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(pacientes)
}

func ListarPacientesAbsenteistas(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)

	rows, err := db.Query("SELECT nomepaciente FROM pacientes WHERE encaminhado = false")
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao buscar pacientes encaminhados: %v", err), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	type PacienteAbsenteistas struct {
		Nome string `json:"nome"`
	}
	var pacientes []PacienteAbsenteistas

	for rows.Next() {
		var paciente PacienteAbsenteistas
		err := rows.Scan(&paciente.Nome)
		if err != nil {
			http.Error(w, fmt.Sprintf("Erro ao ler nome do paciente: %v", err), http.StatusInternalServerError)
			return
		}
		pacientes = append(pacientes, paciente)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, fmt.Sprintf("Erro nos resultados do banco de dados: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(pacientes)
}

// Nova função para contar todos os pacientes
func ContarPacientes() (int, error) {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM pacientes").Scan(&count)
	return count, err
}

func ContarPacientesHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	count, err := ContarPacientes()
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao contar pacientes: %v", err), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "%d", count)
}

// Nova função para contar pacientes etilistas
func ContarPacientesEtilistas() (int, error) {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM pacientes WHERE etilista = true").Scan(&count)
	return count, err
}

func ContarPacientesEtilistasHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	count, err := ContarPacientesEtilistas()
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao contar pacientes etilistas: %v", err), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "%d", count)
}

// Nova função para contar pacientes tabagistas
func ContarPacientesTabagistas() (int, error) {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM pacientes WHERE tabagista = true").Scan(&count)
	return count, err
}

func ContarPacientesTabagistasHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	count, err := ContarPacientesTabagistas()
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao contar pacientes tabagistas: %v", err), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "%d", count)
}

func ContarPacientesMaiorQuarenta() (int, error) {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM pacientes WHERE \"40anos\" = true").Scan(&count)
	return count, err
}

func ContarPacientesMaiorQuarentaHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	count, err := ContarPacientesMaiorQuarenta()
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao contar pacientes com mais de 40 anos: %v", err), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "%d", count)
}

func ContarPacientesLesao() (int, error) {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM pacientes WHERE lesao = true").Scan(&count)
	return count, err
}

func ContarPacientesLesaoHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	count, err := ContarPacientesLesao()
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao contar pacientes com lesão: %v", err), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "%d", count)
}
func ContarPacientesEncaminhados() (int, error) {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM pacientes WHERE encaminhado = true").Scan(&count)
	return count, err
}

func ContarPacientesEncaminhadosHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	count, err := ContarPacientesEncaminhados()
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao contar pacientes encaminhados: %v", err), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "%d", count)
}
func ContarPacientesNaoEncaminhados() (int, error) {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM pacientes WHERE encaminhado = false").Scan(&count)
	return count, err
}

func ContarPacientesNaoEncaminhadosHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)
	count, err := ContarPacientesNaoEncaminhados()
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao contar pacientes não encaminhados: %v", err), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "%d", count)
}
func main() {
	http.HandleFunc("/cadastrar-paciente", CadastrarPacientes)
	http.HandleFunc("/listar-nomes-datas-pacientes", ListarNomesEDatasPacientes)
	http.HandleFunc("/listar-pacientes-encaminhados", ListarPacientesEncaminhados)
	http.HandleFunc("/listar-pacientes-absenteistas", ListarPacientesAbsenteistas)
	http.HandleFunc("/criar-usuario", CriarUsuario)
	http.HandleFunc("/login", Login)
	http.HandleFunc("/contar-pacientes", ContarPacientesHandler)
	http.HandleFunc("/contar-pacientes-etilistas", ContarPacientesEtilistasHandler)
	http.HandleFunc("/contar-pacientes-tabagistas", ContarPacientesTabagistasHandler)
	http.HandleFunc("/contar-pacientes-maior-quarenta", ContarPacientesMaiorQuarentaHandler)
	http.HandleFunc("/contar-pacientes-lesao", ContarPacientesLesaoHandler)
	http.HandleFunc("/contar-pacientes-encaminhados", ContarPacientesEncaminhadosHandler)
	http.HandleFunc("/contar-pacientes-nao-encaminhados", ContarPacientesNaoEncaminhadosHandler)

	fmt.Println("Servidor iniciado na porta 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
