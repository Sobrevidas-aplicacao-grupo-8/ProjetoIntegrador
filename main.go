package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"text/template"

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
var tpl *template.Template

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

	// Carrega os templates HTML
	tpl = template.Must(template.ParseGlob("*.html"))
}

type Usuario struct {
	Email    string
	CPF      string
	Telefone string
	Username string
	Password string
}

type Paciente struct {
	Nome           string
	CPF            string
	DataNascimento string
	Sexo           string
	Telefone       string
	Email          string
	NomeMae        string
	CEP            string
	Estado         string
	Cidade         string
	Endereco       string
	// Campos para checkboxes
	HomemMaiorQuarenta bool
	Etilista           bool
	LesaoSuspeita      bool
	Tabagista          bool
	DataCadastro       string
	Microarea          string
}

func CriarUsuario(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Erro ao processar o formulário", http.StatusBadRequest)
		return
	}

	email := r.FormValue("email")
	password := r.FormValue("password")
	cpf := r.FormValue("cpf")
	telefone := r.FormValue("telefone")
	username := r.FormValue("username")

	sqlStatement := `
	INSERT INTO usuarios (email, password, cpf, telefone, username)
	VALUES ($1, $2, $3, $4, $5)`

	_, err = db.Exec(sqlStatement, email, password, cpf, telefone, username)
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao inserir dados no banco de dados: %v", err), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/listar-usuarios", http.StatusSeeOther)
}

func ListarUsuarios(w http.ResponseWriter, r *http.Request) {
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

	err = tpl.ExecuteTemplate(w, "mostrarusuarios.html", usuarios)
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao renderizar template: %v", err), http.StatusInternalServerError)
		return
	}
}

func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		tpl.ExecuteTemplate(w, "login.html", nil)
		return
	}

	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Erro ao processar o formulário", http.StatusBadRequest)
		return
	}

	email := r.FormValue("email")
	password := r.FormValue("password")

	var storedPassword string
	err = db.QueryRow("SELECT password FROM usuarios WHERE email = $1", email).Scan(&storedPassword)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Email não encontrado", http.StatusUnauthorized)
		} else {
			http.Error(w, fmt.Sprintf("Erro ao buscar dados no banco de dados: %v", err), http.StatusInternalServerError)
		}
		return
	}

	if password != storedPassword {
		http.Error(w, "Senha incorreta", http.StatusUnauthorized)
		return
	}

	http.Redirect(w, r, "/listar-usuarios", http.StatusSeeOther)
}

func CadastrarPacientes(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Erro ao processar o formulário", http.StatusBadRequest)
		return
	}

	// Captura dos valores das checkboxes
	homemMaiorQuarenta := r.FormValue("homem_maior_quarenta") == "on"
	etilista := r.FormValue("etilista") == "on"
	lesaoSuspeita := r.FormValue("lesao_suspeita") == "on"
	tabagista := r.FormValue("tabagista") == "on"

	paciente := Paciente{
		Nome:               r.FormValue("nome"),
		CPF:                r.FormValue("cpf"),
		DataNascimento:     r.FormValue("data_nascimento"),
		Sexo:               r.FormValue("sexo"),
		Telefone:           r.FormValue("telefone"),
		Email:              r.FormValue("email"),
		NomeMae:            r.FormValue("nome_mae"),
		CEP:                r.FormValue("cep"),
		Estado:             r.FormValue("estado"),
		Cidade:             r.FormValue("cidade"),
		Endereco:           r.FormValue("endereco"),
		HomemMaiorQuarenta: homemMaiorQuarenta,
		Etilista:           etilista,
		LesaoSuspeita:      lesaoSuspeita,
		Tabagista:          tabagista,
		DataCadastro:       r.FormValue("data_cadastro"),
		Microarea:          r.FormValue("microarea"),
	}

	sqlStatement := `
	INSERT INTO pacientes (nomepaciente, cpf, nascimento, sexo, telefone, email, nomemae, cep, estado, cidade, endereco, "40anos", etilista, lesao, tabagista, cadastro, microarea)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`

	_, err = db.Exec(sqlStatement, paciente.Nome, paciente.CPF, paciente.DataNascimento, paciente.Sexo, paciente.Telefone, paciente.Email, paciente.NomeMae, paciente.CEP, paciente.Estado, paciente.Cidade, paciente.Endereco, paciente.HomemMaiorQuarenta, paciente.Etilista, paciente.LesaoSuspeita, paciente.Tabagista, paciente.DataCadastro, paciente.Microarea)
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao inserir dados no banco de dados: %v", err), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/listar-pacientes", http.StatusSeeOther)
}

func ListarPacientes(w http.ResponseWriter, r *http.Request) {
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

	err = tpl.ExecuteTemplate(w, "listarpacientes.html", pacientes)
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao renderizar template: %v", err), http.StatusInternalServerError)
		return
	}
}

func AtualizarPaciente(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Erro ao processar o formulário", http.StatusBadRequest)
		return
	}

	// Extrair os campos do formulário
	nome := r.FormValue("nome")
	cpf := r.FormValue("cpf")
	dataNascimento := r.FormValue("data_nascimento")
	sexo := r.FormValue("sexo")
	telefone := r.FormValue("telefone")
	cep := r.FormValue("cep")
	microarea := r.FormValue("microarea")
	estado := r.FormValue("estado")
	cidade := r.FormValue("cidade")
	endereco := r.FormValue("endereco")
	email := r.FormValue("email")
	nomeMae := r.FormValue("nome_mae")
	dataCadastro := r.FormValue("data_cadastro")

	// Montar o comando SQL para atualização
	sqlStatement := `
		UPDATE pacientes 
		SET nome = $1, data_nascimento = $2, sexo = $3, telefone = $4,
			cep = $5, microarea = $6, estado = $7, cidade = $8, endereco = $9,
			email = $10, nome_mae = $11, data_cadastro = $12
		WHERE cpf = $13`

	// Executar o comando SQL no banco de dados
	_, err = db.Exec(sqlStatement, nome, dataNascimento, sexo, telefone, cep, microarea,
		estado, cidade, endereco, email, nomeMae, dataCadastro, cpf)
	if err != nil {
		http.Error(w, fmt.Sprintf("Erro ao atualizar dados no banco de dados: %v", err), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/listar-pacientes", http.StatusSeeOther)
}

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	http.HandleFunc("/criar-usuario", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			http.ServeFile(w, r, "cadastro.html")
		} else if r.Method == http.MethodPost {
			CriarUsuario(w, r)
		} else {
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		}
	})

	http.HandleFunc("/listar-usuarios", ListarUsuarios)
	http.HandleFunc("/login", Login)

	http.HandleFunc("/cadastrar-paciente", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			http.ServeFile(w, r, "cadastropaciente.html")
		} else if r.Method == http.MethodPost {
			CadastrarPacientes(w, r)
		} else {
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		}
	})
	// Configuração do servidor HTTP
	http.HandleFunc("/atualizar-paciente", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPut {
			AtualizarPaciente(w, r)
		} else {
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		}
	})

	http.HandleFunc("/listar-pacientes", ListarPacientes)

	fmt.Println("Servidor iniciado na porta 8080")
	http.ListenAndServe(":8080", nil)
}
