package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"
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

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
}

func CriarUsuario(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
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

func ListarUsuarios(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	rows, err := db.Query("SELECT email, cpf, telefone, username FROM usuarios")
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao buscar usuários: %v", err), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var usuarios []Usuario
	for rows.Next() {
		var u Usuario
		err := rows.Scan(&u.Email, &u.CPF, &u.Telefone, &u.Username)
		if err != nil {
			http.Error(w, fmt.Sprintf("Erro ao ler dados do usuário: %v", err), http.StatusInternalServerError)
			return
		}
		usuarios = append(usuarios, u)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, fmt.Sprintf("Erro nos resultados do banco de dados: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(usuarios)
}

func Login(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
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
	enableCORS(w)
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var paciente Paciente
	err := json.NewDecoder(r.Body).Decode(&paciente)
	if err != nil {
		http.Error(w, "Erro ao processar o JSON", http.StatusBadRequest)
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
}

func ListarPacientes(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	rows, err := db.Query("SELECT nomepaciente, cpf, nascimento, sexo, telefone, email, nomemae, cep, estado, cidade, endereco, \"40anos\", etilista, lesao, tabagista, cadastro, microarea FROM pacientes")
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao buscar pacientes: %v", err), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var pacientes []Paciente
	for rows.Next() {
		var p Paciente
		err := rows.Scan(&p.Nome, &p.CPF, &p.DataNascimento, &p.Sexo, &p.Telefone, &p.Email, &p.NomeMae, &p.CEP, &p.Estado, &p.Cidade, &p.Endereco, &p.HomemMaiorQuarenta, &p.Etilista, &p.LesaoSuspeita, &p.Tabagista, &p.DataCadastro, &p.Microarea)
		if err != nil {
			http.Error(w, fmt.Sprintf("Erro ao ler dados do paciente: %v", err), http.StatusInternalServerError)
			return
		}
		pacientes = append(pacientes, p)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, fmt.Sprintf("Erro nos resultados do banco de dados: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(pacientes)
}

func AtualizarPaciente(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method != http.MethodPut {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var paciente Paciente
	err := json.NewDecoder(r.Body).Decode(&paciente)
	if err != nil {
		http.Error(w, "Erro ao processar o JSON", http.StatusBadRequest)
		return
	}

	sqlStatement := `
		UPDATE pacientes 
		SET nome = $1, data_nascimento = $2, sexo = $3, telefone = $4,
			cep = $5, microarea = $6, estado = $7, cidade = $8, endereco = $9,
			email = $10, nome_mae = $11, data_cadastro = $12
		WHERE cpf = $13`

	_, err = db.Exec(sqlStatement, paciente.Nome, paciente.DataNascimento, paciente.Sexo, paciente.Telefone, paciente.CEP, paciente.Microarea,
		paciente.Estado, paciente.Cidade, paciente.Endereco, paciente.Email, paciente.NomeMae, paciente.DataCadastro, paciente.CPF)
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao atualizar dados no banco de dados: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
func ListarNomesEDatasPacientes(w http.ResponseWriter, r *http.Request) {
	// Habilita CORS (Cross-Origin Resource Sharing)
	enableCORS(w)

	// Consulta SQL para buscar nome e data de nascimento dos pacientes
	rows, err := db.Query("SELECT nomepaciente, data_nascimento FROM pacientes")
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao buscar nomes e datas dos pacientes: %v", err), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	// Estrutura para armazenar os dados dos pacientes
	type Paciente struct {
		Nome           string `json:"nome"`
		DataNascimento string `json:"data_nascimento"`
	}

	var pacientes []Paciente
	for rows.Next() {
		var paciente Paciente
		err := rows.Scan(&paciente.Nome, &paciente.DataNascimento)
		if err != nil {
			http.Error(w, fmt.Sprintf("Erro ao ler dados do paciente: %v", err), http.StatusInternalServerError)
			return
		}
		pacientes = append(pacientes, paciente)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, fmt.Sprintf("Erro nos resultados do banco de dados: %v", err), http.StatusInternalServerError)
		return
	}

	// Configuração do cabeçalho para responder com JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(pacientes)
}

func main() {
	var err error
	db, err = sql.Open("sqlite3", "./foo.db")
	if err != nil {
		panic(err)
	}
	http.HandleFunc("/criar-usuario", CriarUsuario)
	http.HandleFunc("/listar-usuarios", ListarUsuarios)
	http.HandleFunc("/login", Login)
	http.HandleFunc("/cadastrar-paciente", CadastrarPacientes)
	http.HandleFunc("/listar-pacientes", ListarPacientes)
	http.HandleFunc("/atualizar-paciente", AtualizarPaciente)
	http.HandleFunc("/listar-nomes-datas-pacientes", ListarNomesEDatasPacientes)

	fmt.Println("Servidor iniciado na porta 8080")
	http.ListenAndServe(":8080", nil)
}
