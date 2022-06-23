import './App.css'
import Card from "./components/Card";
import cards from "./appData/cards"

const App = () => {
    return (
        <div className="app">
            <header className="page-header">
                <h1 className="page-header_title"> Ты сегодня покормил&nbsp;кота? </h1>
            </header>
            <main className="content">
                {
                    cards.map(data => Card(data))
                }
            </main>
        </div>
    )
}

export default App
