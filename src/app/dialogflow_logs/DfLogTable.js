import React, {useEffect, useState} from "react";

import ReactScrollTable from 'react-scroll-table';
import { db } from '../firebase';

function DfLogTable(props) {

    const [df_logs, setLogs] = useState([]);
    const [formatted_logs, setFormattedLogs] = useState([]);
    const [tableProps, setProps] =  useState();
    useEffect(() =>{
            fetchLogs();
    },[]);

    const fetchLogs = async () => {
        const docRef = db.collection('df_logs');
        const data = await docRef.get();
        
        let formatted_data = []

        data.docs.forEach( item => {
            console.log(item.data());
            setLogs([...df_logs,item.data()]);

            item.data().messages.forEach( mssg => {
                formatted_data.push({ 
                name: item.data().name.split('/')[item.data().name.split('/').length - 1] ,
                createTimestamp: mssg.createTime.seconds,
                message: mssg.content,
             });
            })

            
        });
        //console.log(formatted_data);
        setFormattedLogs(formatted_data);
        setProps(getTableProps(formatted_data));
    }

    const getTableProps = (data) => {
        return {
            backgroundColor: '#ffffff',
            borderColor: '#dfdfdf',
            columns: [
              {
                header: 'Message',
                accessor: 'message',
                width: '50%',
              },
              {
                header: 'Timestamp',
                accessor: 'createTimestamp',
                width: '20%',
                sortable: true,
              },
              {
                header: 'Conversation Id',
                accessor: 'name',
                width: '30%',
              }

            ],
            data: data,
            downIcon: <i className="fa fa-down"/>,
            maxHeight: 450,
            noDataText: '--',
            shaded: true,
            shadedColor: '#fdefff',
            textColor: '#000000',
            upIcon: <i className="fa fa-up"/>
          }
    };

    return (
        <div style={{padding: 20}}>
            { tableProps ? <ReactScrollTable {...tableProps}/> : null}
        </div>);
}

export default DfLogTable;