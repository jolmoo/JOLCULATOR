import { View, Text } from 'react-native'
import {globalStyles} from "@/styles/global-styles";
import ThemeText from "@/componentes/ThemeText";
import CalculatorButton from "@/componentes/CalculatorButton";
import {Colors} from "@/constants/Colors";
import {useCalculator} from "@/hooks/useCalculator";

const CalculadoraApp = () => {


    const{formula,prevNumber,buildNumber,clean,cambiarSigno,deleteLast,divideOperation,multiplicateOperation,addOperation,subOperation,calculateResult,setLastNumber,calcularResult} = useCalculator();


    return (
        <View style={globalStyles.calculatorContainer}>

            {/* resultados */}
            <View style={{paddingHorizontal:30, paddingBottom:20}}>
                <ThemeText variant ='h1'>{formula}</ThemeText>

                {
                    formula == prevNumber ? (
                        <ThemeText variant="h2"></ThemeText>
                    ):(
                        <ThemeText variant="h2">{prevNumber}</ThemeText>
                    )

                }

            </View>

            {/* filas botones */}

            <View style={globalStyles.row}>


                <CalculatorButton label="C" blackText color={Colors.lightGray} onPress={clean} />

                <CalculatorButton label="+/-" blackText color={Colors.lightGray}  onPress={cambiarSigno} />

                <CalculatorButton label="del" blackText color={Colors.lightGray}  onPress={deleteLast} />



                <CalculatorButton label="÷" color ={Colors.blue} onPress={divideOperation} />


            </View>


            <View style={globalStyles.row}>

                <CalculatorButton label="7" blackText color={Colors.darkGray}  onPress={() => buildNumber('7')} />


                <CalculatorButton label="8" blackText color={Colors.darkGray}  onPress={() => buildNumber('8')} />


                <CalculatorButton label="9" blackText color={Colors.darkGray} onPress={() => buildNumber('9')} />


                <CalculatorButton label="×" color ={Colors.blue} onPress={multiplicateOperation} />


            </View>

            <View style={globalStyles.row}>

                <CalculatorButton label="4" blackText color={Colors.darkGray}  onPress={() => buildNumber('4')} />


                <CalculatorButton label="5" blackText color={Colors.darkGray}  onPress={() =>buildNumber('5')} />


                <CalculatorButton label="6" blackText color={Colors.darkGray} onPress={() => buildNumber('6')} />


                <CalculatorButton label="-" color ={Colors.blue} onPress={subOperation} />


            </View>

            <View style={globalStyles.row}>

                <CalculatorButton label="1" blackText color={Colors.darkGray}  onPress={() => buildNumber('1')} />


                <CalculatorButton label="2" blackText color={Colors.darkGray}  onPress={() => buildNumber('2')} />


                <CalculatorButton label="3" blackText color={Colors.darkGray} onPress={() => buildNumber('3')} />


                <CalculatorButton label="+" color ={Colors.blue} onPress={addOperation} />


            </View>

            <View style={globalStyles.row}>

                <CalculatorButton label="0" doubleSize blackText color={Colors.darkGray}  onPress={() => buildNumber('0')} />


                <CalculatorButton label="," blackText color={Colors.darkGray}  onPress={() => buildNumber(',')} />


                <CalculatorButton label="=" color ={Colors.blue} onPress={calcularResult} />


            </View>



        </View>
    );
};
export default CalculadoraApp