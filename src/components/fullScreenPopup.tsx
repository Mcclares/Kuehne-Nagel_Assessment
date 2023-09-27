import React from 'react';
import Field from './Field';
import { orderProps } from './Table';

import "./fullScreenPopup.css"

interface FullScreenPopupProps {
  isVisible: boolean;
    onClose: () => void;
    data: orderProps[];
    orderNo: string | null;
}

const FullScreenPopup: React.FC<FullScreenPopupProps> = ({ isVisible, onClose, data, orderNo }) => {
    const popupStyle: React.CSSProperties = {
        display: isVisible ? 'block' : 'none',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: '1000',
        overflow: 'auto',
    };

    const contentStyle: React.CSSProperties = {
        paddingBottom: '80px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        width: '80%',
        height: '450px',
    
       
       
        borderRadius: '5px',
       
    };

    return (
        <div style={popupStyle}>
           
            
            <div style={contentStyle}>
            <div className='line'></div>
            <div className='blockContent'>

             


                <h1>SHIPMENT DETAILS</h1>
                {orderNo && (
                    <div key={orderNo}>
                        {data.map((item: orderProps) => {
                            if (item.orderNo === orderNo) {
                                // Найден соответствующий заказ, отображаем его данные
                                return (
                                    <div className="row"key={item.orderNo}>
                                        <div className='column'>
                                        <Field label='orderNo' value={item.orderNo} />
                                        
                                            <Field label="customer" value={item.customer} />
                                        <Field label="consignee" value={item.consignee} />    
                                        </div>
                                        <div className='column'>
                                         <Field label="date" value={item.date} />
                                        <Field label="trackingNo" value={item.trackingNo} />
                
                                            <Field label="status" value={item.status} />
                                        </div>
                                    </div>
                                );
                            }
                              return null;
                        }
                        )
                        }
                    </div>
                  
                )
                }
                 {/* <div className='line'>
               </div> */}
                
                </div>
                
                <div className='downLine'></div>
                 <button className='buttonPopup' onClick={onClose}>Close</button>
                 
                </div>
            </div>
          
            
            
       
    )
}
                      
export default FullScreenPopup;