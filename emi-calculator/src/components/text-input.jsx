function TextInput ({title, state, setState}) {
    return (
        <>
            <span className='title'>{title}</span>
            <input
            value={state}
            placeholder={title}
            type='number'
            onChange={(e) => setState(e.target.value)}
            />
        </>
    )
}

export default TextInput;