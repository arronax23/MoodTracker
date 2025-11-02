import Calendar from './components/Calendar';
import FormPanel from './components/FormPanel';
import DarkenBackground from './components/DarkenBackground';
import './App.css';

function App() {

    return (
        <div id="main-page">
            <Calendar/>
            <DarkenBackground />
            <FormPanel />
        </div>
    );
}

export default App;