import { useState, useContext } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext"
import { useNavigate, useLocation  } from "react-router-dom"
import './index.css';

const Login = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [msgError, setMsgError] = useState('')
    const [msg, setMsg] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        if(email && password) {           
           const isLogged = await auth.signin(email, password)
            
            if(!isLogged){
                setMsgError('Email e/ou senha inválidos!')
                return false
            }

            navigate('/home')
        } else {
            setMsgError('Todos os campos precisam ser preenchidos!')
        }
    }

    const handleRegister = async () => {       
        navigate('/register')
    }

    return (
        <div>
            <div className="div_form_container">
                <div>
                    <form className="class_form_login">
                        <label className="class_form_label">ENTRAR</label>
                        <div>
                            <input className="input_form" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu email" />
                        </div>                        
                        <div>
                            <input className="input_form" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" />
                        </div>
                        <div>
                            <button type="button" className="buttons_login" onClick={handleLogin}>Logar</button>
                            <button type="button" className="buttons_login" onClick={handleRegister}>Ainda não tem conta? Crie agora</button>
                        </div>
                        <div>
                            <p style={{color: 'red'}}>{msgError}</p>
                            {msg && <p style={{color: 'green'}}>{msg}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login