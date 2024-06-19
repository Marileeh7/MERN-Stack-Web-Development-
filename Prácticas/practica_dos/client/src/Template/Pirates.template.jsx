import styles from './Pirates.module.css';
import "../App.css"; // Asegúrate de importar los estilos globales

const PiratesTemplate = (props) => {
    return (
        <div className={`container ${styles.bgOrange}`}>
            <div className={`row d-flex ${styles.header}`}>
                <div className={`col ${styles.absolutePosition}`}>
                    <h1 className={styles.centerTitle}>{props.title}</h1>
                    {props.hasButton ? 
                        <button className={styles.endButton} onClick={props.buttonAction}>
                            {props.buttonText}
                        </button> :
                        null
                    }
                </div>
            </div>
            <div className={`row d-flex justify-content-center ${styles.content}`}>
                {props.children}
            </div>
        </div>
    )
}

export default PiratesTemplate;
