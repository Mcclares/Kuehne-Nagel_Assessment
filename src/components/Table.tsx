
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Table.css";
import Button from './Button';
import jsonData from '../dataBase.json';
import FullScreenPopup from './fullScreenPopup';


import _ from 'lodash';


export interface orderProps {
    orderNo: string;
    date: string; // переделать на Date
    customer: string
    trackingNo: string;
    status: string; //"Shipped" | "Delivered" | "In transit";
    consignee: string;
}
type ButtonClasses = {
  customer: string;
  trackingNo: string;
  status: string;
};




export default function Table() {
    const [currentOrderNo, setCurrentOrderNo] = useState<string | null>(null); // Состояние для текущего orderNo  
    const [isPopupVisible, setPopupVisible] = useState(false);

        const handleShowPopup = () => {
            setPopupVisible(true);
            console.log("Opened");
        };

        const handleClosePopup = () => {
            setPopupVisible(false);
    };
    
    //Sirt
    const [sortOrder, setSortOrder] = useState<string>(''); // 'asc' для возрастающей сортировки, 'desc' для убывающей
    const [sortField, setSortField] = useState<string>(''); //

    
  const sortData = (field: string) => {
  const sortedData = _.orderBy(data, [field], [sortOrder === 'asc' ? 'asc' : 'desc']);
  setData(sortedData);
    };

    const handleSort = (field: string) => {
        if (field === sortField) {
            // Изменяем направление сортировки, если уже сортируется по этому полю
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Устанавливаем поле сортировки и сортировку по умолчанию (asc)
            setSortField(field);
            setSortOrder('asc');
        }
        sortData(field);
    };
  
    
    
    const [data, setData] = useState<orderProps[]>([]);

    useEffect(() => {
        //!OverLoaded
        // const fetchData = async () => { 
        //     try {

        //         const response = await axios.get("https://my.api.mockaroo.com/shipments.json?key=5e0b62d0");
        //         setData(response.data);

        //     }catch (error) {
        //         console.error("Loading error ", error)
        //     }
        // } 
        // fetchData();
        setData(jsonData);
    }, [])
    const deleteItem = (idToDelete: string) => {
        const updatedData = data.filter((item: orderProps) => item.orderNo !== idToDelete)
        setData(updatedData);
    }

    const [buttonClasses, setButtonClasses] = useState<ButtonClasses>({
        customer: 'sortButton',
        trackingNo: 'sortButton',
        status: 'sortButton',
        });
        const handleButtonClick = (field: keyof ButtonClasses) => {
    // Функция для переключения классов
    setButtonClasses((prevButtonClasses) => ({
        ...prevButtonClasses,
        [field]: prevButtonClasses[field] === "sortButton" ? "sortButtonLeft" : "sortButtonRight",
    }));
    };





    return (
        <div className='page-container'>
            <div className='table-container'>
              
                <table>
                    <thead>
                        <tr> 
                            <th>ORDERNO </th>
                            <th>DELIVERYDATE</th>
                            <th>CUSTOMER <button className={buttonClasses.customer} onClick={() => { handleSort('customer');  handleButtonClick("customer"); }}></button></th>
                            <th>TRACKINGNO <button className={buttonClasses.trackingNo} onClick={() => { handleSort('trackingNo');  handleButtonClick("trackingNo"); }}></button></th>
                            <th>STATUS <button className={buttonClasses.status} onClick={() => { handleSort('status');  handleButtonClick("status"); }}></button></th>
                            <th>CONSIGNEE</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item: orderProps) => (
                                <tr key={item.orderNo}>
                                    <td>{item.orderNo }</td>
                                    <td>{item.date}</td>
                                    <td>{item.customer}</td>
                                    <td>{item.trackingNo}</td>
                                    <td>{item.status}</td>
                                    <td>{item.consignee}</td>
                                   
                                    <td className='buttons' id="watchingButton">
                                        <Button orderNo={item.orderNo}type="Watching"  onAct={(orderNo) => {
                                            if (item.orderNo) {
                                                setCurrentOrderNo(item.orderNo);
                                                handleShowPopup();
                                            }
                                        }} />
                                        
                                    </td>
                                    <td className='buttons' id='deleteButton'>
                                        <Button type="Delete" onAct={() => {
                                            deleteItem(item.orderNo);
                                        }}/>
                                    </td>
                                 
                                   
                                </tr>
                            ))

                        }

                    </tbody>
                </table>
                    {currentOrderNo && ( // Проверка наличия текущего orderNo перед отображением всплывающего окна
    <FullScreenPopup isVisible={isPopupVisible} onClose={handleClosePopup} data={data} orderNo={currentOrderNo} />
  )}
                
                </div>
        </div>
    );
};