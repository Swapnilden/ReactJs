import { numberWithCommas } from "../utils/config";

function SliderInput({
    title,
    underlineTitle,
    min,
    max,
    state,
    onChange,
    labelMin,
    labelMax
}){
    return (
        <>
            <span className='title'>{title}</span>
                  { state > 0 && (<span className='title' style={{textDecoration: 'underline'}}>
                    {" "}
                    {underlineTitle}
                  </span>)}
                  <div>
                    <input
                    type='range'
                    min={min}
                    max={max}
                    value={state}
                    onChange={onChange}
                    className='slider'
                    />
            
                    <div className='labels'>
                      <label>{labelMin ?? numberWithCommas(min)}</label>
                      <label>{numberWithCommas(state)}</label>
                      <label>{labelMax ?? numberWithCommas(max)}</label>
                    </div>
                  </div>
        </>
    )
}

export default SliderInput;