import { useGlobalStore } from "../utilities/useGlobalStore"

const DarkenBackground = () => {
    const { formActive } = useGlobalStore();

    return (formActive && <div className="darken-background"></div>)
} 
export default DarkenBackground