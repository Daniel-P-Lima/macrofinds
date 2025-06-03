import React, { Component } from 'react'
import Navbar from '../../assets/Navbar/Navbar'
import "./AboutUs.css"

export default class AboutUs extends Component {
  render() {
    return (
      <div className='met-main'>
        <div className='column left-column'>
            <Navbar/>
        </div>

        <div className='column mid-column'>
            <div className="met-box">
                <div className="header">
                    <b>Metodologia</b>
                </div>
                <div className='met-box-text'>
                    <p>
                     A taxa de metabolismo basal (TMB) é a quantidade mínima de energia (calorias) que o seu corpo precisa para realizar funções vitais enquanto está em repouso, como respirar, manter a temperatura corporal, bombear sangue e realizar outras atividades essenciais para a sobrevivência. Ou seja, é a energia que o seu corpo consome para manter o funcionamento básico, mesmo sem realizar nenhuma atividade física. Através do nosso aplicativo MacroFinds, você tem acesso a um cálculo automático da sua TMB, e com base no objetivo definido por você, definiremos a qualidade de cada dieta por meio desse cálculo, assim como seu custo.
                    </p>
                </div>
                
            </div>
        </div>
      </div>
    )
  }
}
