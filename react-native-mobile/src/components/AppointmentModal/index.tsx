import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import styles from './styles'
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../types';
import api from '../../services/api';

type screenNavigationType = StackNavigationProp<StackParamList, ' '>

export default ({ show, setShow, hospital }) => {

    const navigation = useNavigation<screenNavigationType>()

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);

    useEffect(() => {
        const today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDay(today.getDate());
    }, []);

    useEffect(() => {
        if (hospital.available && selectedDay > 0) {
            let d = new Date(selectedYear, selectedMonth, selectedDay);

            let year = d.getFullYear();
            let month: string | number = d.getMonth() + 1;
            let day: string | number = d.getDate();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            let selDate = `${day}/${month}/${year}`;
            let availability = hospital.available.filter((e) => e.date === selDate);

            if (availability.length > 0) {
                setListHours(availability[0].hour);
            }
        }
        setSelectedHour(null);
    }, [hospital, selectedDay]);

    useEffect(() => {
        if (hospital.available) {
            let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
            let newListDays = [];

            for (let i = 1; i <= daysInMonth; i++) {
                let d = new Date(selectedYear, selectedMonth, i);

                let year = d.getFullYear();
                let month: string | number = d.getMonth() + 1;
                let day: string | number = d.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                let selDate = `${day}/${month}/${year}`;
                let availability = hospital.available.filter((e) => e.date === selDate);

                newListDays.push({
                    status: availability.length > 0 ? true : false,
                    weekday: days[d.getDay()],
                    number: i,
                });
            }
            setListDays(newListDays);
            setSelectedDay(0);
            setListHours([]);
            setSelectedHour(0);

        }
    }, [hospital, selectedMonth, selectedYear]);

    const handleCloseButton = () => {
        setShow(false);
    };

    const handleFinishClick = async () => {
        if (
            hospital.id &&
            selectedYear > 0 &&
            selectedMonth > 0 &&
            selectedDay > 0 &&
            selectedHour != null
        ) {
            // let res = await api.post('/schedule/register', {
            //     date_time: new Date(),
            //     date: `${selectedYear}-${selectedMonth + 1}-${selectedDay}`,
            //     hour: selectedHour,
            //     id_hospital: hospital.id,
            //     id_donor:

            // });

            // if (res.error == '') {
            //     setShow(false);
            //     // navigation.navigate('Appointments');
            // } else {
            //     alert(res.error);
            // }
        } else {
            Alert.alert('Preencha todos os dados');
        }
    };
    const handleLeftDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() - 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    };

    const handleRightDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() + 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    };


    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide" >
            <View style={styles.modalArea}>
                <View style={styles.modalBody}>
                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseButton}>
                        <MaterialIcons name='expand-more' size={40} color='#C3C3C5' />
                    </TouchableOpacity>

                    <View style={styles.modalItem}>
                        <View style={styles.hospitalInfo}>
                            <MaterialIcons name='local-hospital' size={25} color='#76BFAC' style={styles.hospitalIcon} />
                            <Text style={styles.hospitalName}>{hospital.company}</Text>
                        </View>
                    </View>
                    <View style={styles.modalItem}>
                        <View style={styles.dateInfo}>
                            <TouchableOpacity style={styles.dataPrevArea} onPress={handleLeftDateClick}>
                                <AntDesign
                                    name='left'
                                    size={30}
                                    color='#414141'
                                />
                            </TouchableOpacity>
                            <View style={styles.dateTitleArea}>
                                <Text style={styles.dateTitle}>
                                    {months[selectedMonth]} {selectedYear}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.dataNextArea} onPress={handleRightDateClick}>
                                <AntDesign
                                    name='right'
                                    size={30}
                                    color='#414141'
                                />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.dateList} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {listDays.map((item, key) => (
                                <TouchableOpacity
                                    style={[styles.dateItem,
                                    { opacity: item.status ? 1 : 0.5, backgroundColor: item.number === selectedDay ? '#76BFAC' : '#FFFFFF' }]}
                                    key={key}
                                    onPress={() => item.status ? setSelectedDay(item.number) : null}>

                                    <Text style={[styles.dateItemWeekDay,
                                    { color: item.number === selectedDay ? '#FFFFFF' : '#000', }]}>
                                        {item.weekday}
                                    </Text>

                                    <Text style={[styles.dateItemNumber,
                                    { color: item.number === selectedDay ? '#FFFFFF' : '#000', }]}>
                                        {item.number}
                                    </Text>

                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    {listHours.length > 0 && (
                        <View style={styles.modalItem}>
                            <ScrollView style={styles.timeList}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {listHours.map((item, key) => (
                                    <TouchableOpacity style={[styles.timeItem,
                                    { backgroundColor: item === selectedHour ? '#76BFAC' : '#FFF', }]}
                                        key={key}
                                        onPress={() => setSelectedHour(item)}>
                                        <Text style={[styles.timeItemText,
                                        { color: item === selectedHour ? '#FFF' : '#000', fontWeight: item === selectedHour ? 'bold' : 'normal', }]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <TouchableOpacity style={styles.finishButton} onPress={handleFinishClick}>
                        <Text style={styles.finishButtonText}>AGENDAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    );
}