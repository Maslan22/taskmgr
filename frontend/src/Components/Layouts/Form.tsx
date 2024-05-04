import React from 'react'
import Input from './Input'
import Multiselect from 'multiselect-react-dropdown';
interface FormProps {
    formData: any,
    buttonHandler: (e : any) => void,
    btnTitle: string
}
export default function Form({formData,btnTitle,buttonHandler}: FormProps) { 
  return (
    <div className="max-w-md mx-auto">
        {
        formData.map((data: any) => {
            return ( 
                data.type !== 'select' ?
            <Input defaultValue={data.defaultValue} setInputState={(e: any) => data.setInputState(e)} key={data.id} title={data.title} name={data.name} placeholder={data.placeholder} type={data.type}/>:
            // <Multiselect
            // key={data.id}
            // options={data.options} // Options to display in the dropdown
            // // selectedValues={} // Preselected value to persist in dropdown
            // onSelect={(selectedList, selectedItem) => { data.setInputState(selectedList)}} // Function will trigger on select event
            // // onRemove={this.onRemove} // Function will trigger on remove event
            // displayValue={data.name} // Property name to display in the dropdown options 
            // />
            <select multiple onChange={(e: any) => data.setInputState(e.target.selectedOptions)} key={data.id} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                {data.options.map((option: any) => {
                    return <option key={option.id} value={option.name}>{option.name}</option>
                })}
            </select>
        )
        })} 
  <button onClick={buttonHandler} type="submit" className=" inline-block w-2/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{btnTitle}</button>
</div>
  )
}
