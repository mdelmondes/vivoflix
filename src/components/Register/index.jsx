import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import './index.css'

const Register = () => {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [emailConf, setEmailConf] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [msgError, setMsgError] = useState('')
    const [msg, setMsg] = useState('')

    const goToLogin = () => {       
        navigate('/login')          
    }

    const handleRegister = async () => {
        if(!nome && !email && !emailConf && !senha){
            setMsgError('Todos os campos precisam ser preenchidos!')
            return false
        } else {
            if(email !== emailConf) {
                setMsgError('Os emails precisam ser iguais!')
                return false
            }

            const register = await auth.signup(email, nome, senha)
            const data = JSON.parse(register) 
            
            if(data.statusCode === 201){                  
                navigate('/login')
                alert('Conta criada com sucesso!')
                //toast.success("Conta criada com sucesso!", {
                //    position: toast.POSITION.BOTTOM_LEFT
                //})    
            } else if (data.statusCode === 409) {
                setMsgError('Email informado já está cadastrado!')
                return false
            }
        }

    }

    return (
        <div>
            <div className="div_form_container">
                <div>
                    <form className="class_form_register">
                    <label className="class_form_label">REGISTRE-SE</label>
                        <div>
                            <input value={nome} onChange={e => setNome(e.target.value)} className="input_form" type="text" placeholder="Digite o seu nome" />
                            </div>
                        <div>
                            <input value={email} onChange={e => setEmail(e.target.value)} className="input_form" type="text" placeholder="Digite o seu email" />
                        </div>
                        <div>
                            <input value={emailConf} onChange={e => setEmailConf(e.target.value)} className="input_form" type="text" placeholder="Confirme o seu email" />
                        </div>
                        <div>
                            <input value={senha} onChange={e => setSenha(e.target.value)} className="input_form" type="password" placeholder="Digite sua senha" />
                        </div>
                        <div>
                            <button type="button" className="buttons_register" onClick={handleRegister}>Registre-se</button>
                            <button type="button" className="buttons_register" onClick={goToLogin}>Já tem uma conta? Entre agora</button>
                        </div>
                        <div>
                            <p style={{color: 'red'}}>{msgError}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register