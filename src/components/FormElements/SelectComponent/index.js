export default function SelectComponent({ label,onChange, value, options = []
}) {
    return (
        <div className='relative'>
            <p className='pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600'>
                {label}
            </p>
            <select
                value={value}
                onChange={onChange}
                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pl-4 r-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md'
            >
                {options && options.length ? options.map(optionItem =><option
                    key={optionItem.id}
                    value={optionItem.id}
                    id={optionItem.id}
                >{optionItem.label}</option>)
                 : <option id='' value={''}>Select option</option> }
            </select>
        </div>
    );
}