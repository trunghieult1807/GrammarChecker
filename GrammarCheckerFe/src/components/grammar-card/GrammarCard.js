import { RiDeleteBin5Line } from 'react-icons/ri';
import 'styles/grammar-card.css';
import { grammarErrors } from '@fake-db/GrammarCardDB';

const Card = ({ card }) => (
    <div {...card} className='card-container'>
        <div className='card-title'>
            <span className={`dot dot-${card.errorid}`}></span>
            <div >{card.title}</div>
        </div>
        <div className='card-body'>
            <div className='error-phrase'>{card.errorphrase}</div>
            <div>  →  </div>
            <div className='correct-phrase'>{card.correctphrase}</div>
        </div>
        <div className='remove-icon'><RiDeleteBin5Line /> </div>
    </div>
);

export const GrammarCard = () => {
    return (
    <div>
        {grammarErrors.map(card => {
            return (<Card
                card={card}
                key={card.errorphrase}
            />);
        })}
    </div>
    );
}