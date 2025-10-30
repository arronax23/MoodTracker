import Calendar from './components/Calendar';
import { getWeek } from './utilities/dateUtils'
import './App.css';

function App() {
    const w1 = getWeek(0);
    const w2 = getWeek(-1);
    const w3 = getWeek(1);

    return (
        <div>
            <Calendar

             />

        </div>
    );
}

export default App;