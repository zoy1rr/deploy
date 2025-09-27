import Silider from '../../components/silider/Silider';
import styles from './men.module.css';
Silider
function Men() {




    // const { id } = useParams();    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);    
    // useEffect(() => {







    return (
        <div className={styles.bg}>


            <header className={styles.Men}>
                <div>
                    <img src="./logo.png" alt="" />
                </div>

                <div className={styles.right}>
                    <input type="text" placeholder='Qidirish...' />
                    <button><i class="fa-brands fa-telegram"></i>  Aloqa</button>
                </div>
            </header>
            <Silider />



        </div>
    );
}

export default Men;
