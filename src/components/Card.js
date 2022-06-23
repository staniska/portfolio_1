import './Card.css'
import {useState, useRef} from "react";

const Card = (data) => {
    const [card, setCard] = useState(data)
    const cardRef = useRef(null)

    const clickHandler = (event) => {
        if (event.target.className === 'card_link') {
            setCard({...card, selected: !card.selected,})
            return
        }

        setCard({...card, selected: !card.selected, clicked: true})
        cardRef.current.addEventListener('mouseleave', mouseLeaveHandler)
    }

    const mouseLeaveHandler = () => {
        setCard({...card, selected: !card.selected, clicked: false})
        cardRef.current.removeEventListener('mouseleave', mouseLeaveHandler)
    }

    const classList = ['card']
    if (!card.enabled) {
        classList.push('card__disabled')
    }
    if (card.selected) {
        classList.push('card__selected')
    }
    if (card.clicked) {
        classList.push('card__clicked')
    }

    return (
        <div className={classList.reduce((acc, cur) => acc + ' ' + cur)}>
            <div className="card_wrapper" onClick={e => clickHandler(e)} ref={cardRef}>
                <h5 className="card_type">
                    <span className="card_type-normal"> Сказочное заморское яство </span>
                    <span className="card_type-confirm"> Котэ не одобряет? </span>
                </h5>
                <h3 className="card_title">
                    {card.title}
                </h3>
                <h4 className="card_subtitle">
                    {card.subTitle}
                </h4>
                <p className="card_portions-number">
                    {'' + Math.round(data.weight / 0.05) + ' порций'}
                </p>
                <p className="card_note">
                    {card.note}
                </p>
                <div className="card_image"></div>
                <div className="card_weight">
                    <div className="card_weight-value"> {card.weight} </div>
                    <div className="card_weight-units"> кг</div>
                </div>
            </div>
            <Slogan card={card} clickHandler={clickHandler}/>
        </div>
    )
}

const Slogan = ({card, clickHandler}) => {
    if (!card.enabled) {
        return <div className="card_slogan"> Печалька, {card.subTitle} закончился </div>
    }
    if (card.selected) {
        return <div className="card_slogan"> {card.slogan} </div>
    }
    return (
        <div className="card_slogan">
            Чего сидишь? Порадуй котэ, <a className="card_link" href="#" onClick={e => clickHandler(e)}> купи. </a>
        </div>
    )
}

export default Card