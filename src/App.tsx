import { useEffect, useState } from 'react'
import './App.css'

const db = {
	"params": [
		{
			"id": 1,
			"name": "Назначение"
		},
		{
			"id": 2,
			"name": "Длина"
		},
		{
			"id": 3,
			"name": "Объем"
		},
	],
	"model": {
		"paramValues": [
			{
				"paramId": 1,
				"value": "повседневное"
			},
			{
				"paramId": 2,
				"value": "макси"
			},
			{
				"paramId": 3,
				"value": "норма"
			}
		] 
	}
}

interface Param {
  id: number;
  name: string;
}
interface ParamValue {
   paramId: number;
   value: string;
}
interface Model {
   paramValues: ParamValue[];
}
interface Props {
   params: Param[] | undefined;
   model: Model;
}

interface InputProps {
	name: string;
	value: string;
   key: number;
   i: number;
   chengeHeaydlerValue: (a: string, b: number, c: number)=> void
}
const Input =(props: InputProps) => {
	const {
		name,
		value,
      key, 
      i,
      chengeHeaydlerValue
	} = props;
	
	const [paramValue, setParamValue] = useState<string>()
	
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setParamValue(e.target.value)
      chengeHeaydlerValue(e.target.value, i, key)
	}
   
	return (
		<div className='wrapp'>
			<h2>{name}</h2>
			<input 
            className='input'
				type="text" 
				value={value} 
				onChange={changeHandler}
            autoFocus={true}
			/>
		</div>
	)
}



function App() {
	const [modelData, setModelData] = useState<Props>()

	useEffect(() => {
		setModelData(db)
	}, [])

   const model = modelData?.model.paramValues
	const params = modelData?.params

   const chengeHeaydlerValue = (itemValue: string, i: number, id: number) => {
      
      const data: Props = {
         ...db,
         ...db.model.paramValues[i] = {paramId: id, value: itemValue}
      }
      setModelData(data)
   }

	return (
      <div className='App'>
         {model?.map((el, i) => 
				<Input
               i={i}
					key={el.paramId}
					name={params ? params[i].name : ''}
					value={el.value}
               chengeHeaydlerValue={chengeHeaydlerValue}
				/>
			)}
         <div className="line"></div>
         <ul className='list'>
            <li>&#x2794; params:
               {params?.map((el) => 
                  <ul>
                     <li>&#x2794; paramId: {el.id}</li>
                     <li>&#x2794; value: {el.name}</li>
                  </ul>
               )}
            </li>
            <li>&#x2794; model: 
               <ul>
                  <li>&#x2794; paramValues:
                        {model?.map((el) => 
                           <ul>
                              <li>&#x2794; paramId: {el.paramId}</li>
                              <li>&#x2794; value: {el.value}</li>
                           </ul>
                        )}
                     
                  </li> 

               </ul>
            </li>
         </ul>
         
         
        
      </div>
   )
}

export default App
