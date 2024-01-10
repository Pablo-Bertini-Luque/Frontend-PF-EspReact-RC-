import React, { useContext, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { stylesGral } from "../../css/Theme";
import { CustomModalSucces } from "../../components/CustomModalSucces";
import { CustumErrorInput } from "../../components/CustumErrorInput";
import { CustomModal } from "../../components/CustomModal";
import { TurnsContext } from "../../contexts/TurnsContext";
import { CustomLoading } from "../../components/CustomLoading";

export const CreateTurn = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(new Date());
  const [isTimeEndPickerVisible, setTimeEndPickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(new Date(date));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  const showTimeEndPicker = () => {
    setTimeEndPickerVisibility(true);
  };

  const hideTimeEndPicker = () => {
    setTimeEndPickerVisibility(false);
  };

  const handleTimeEndConfirm = (time) => {
    setSelectedTimeEnd(time);
    hideTimeEndPicker();
  };

  const {
    state,
    handleCloseModal,
    handleSuccessCloseModal,
    activeErrorModal,
    textModal,
    newTurn,
    activeModal,
  } = useContext(TurnsContext);

  const formik = useFormik({
    initialValues: {
      lugar: "",
      fecha: selectedDate,
      horaInicio: selectedTime,
      horaFin: selectedTimeEnd,
      categoria: "",
      tipoCancha: "",
    },
    validationSchema: Yup.object({
      lugar: Yup.string()
        .required("El nombre del lugar de juego es obligatorio")
        .min(5, "El nombre debe tener un mínimo de 5 caracteres"),
      fecha: Yup.date().required("Debe seleccionar la fecha del turno"),
      horaInicio: Yup.date().required(
        "Debe seleccionar la hora de inicio del turno"
      ),
      horaFin: Yup.date().required("Debe seleccionar la hora de fin del turno"),
      categoria: Yup.number()
        .required("La categoria es obligatoria. Ingrese un numero del 1 al 8")
        .min(1, "La categoria mínima es 1")
        .max(8, "La categoria máxima es 8")
        .typeError("Solamente se permiten ingresar numeros"),
      tipoCancha: Yup.string().required("Debe ingresar el tipo de cancha"),
    }),
    onSubmit: (values) => {
      console.log("Ingresa al onSubmit");

      const formattedDate = selectedDate.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const formatteTimeInit = selectedTime.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const formatteTimeEnd = selectedTimeEnd.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const fechaYHora = `Fecha: ${formattedDate} \n\nHora: ${formatteTimeInit} a ${formatteTimeEnd}`;

      console.log(fechaYHora);

      try {
        newTurn(
          formik.values.lugar,
          fechaYHora,
          formik.values.categoria,
          formik.values.tipoCancha
        );
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <ScrollView>
          <Text style={styles.text}>Crear nuevo turno</Text>
          <View style={{ flex: 1 }}>
            <View style={styles.containerInputs}>
              <View>
                <Text style={styles.label}>Lugar del turno</Text>
                <TextInput
                  style={stylesGral.input}
                  name="lugar"
                  placeholder="Ingrese el lugar del turno"
                  placeholderTextColor="grey"
                  autoComplete="name"
                  onChangeText={(value) => formik.setFieldValue("lugar", value)}
                />
                {formik.errors.lugar && (
                  <CustumErrorInput message={formik.errors.lugar} />
                )}
              </View>
              <View>
                <Text style={styles.label}>Fecha del turno</Text>
                <TouchableOpacity
                  style={stylesGral.input}
                  onPress={showDatePicker}
                >
                  {selectedDate && (
                    <Text>{selectedDate.toLocaleDateString("es-Arg")}</Text>
                  )}
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    value={selectedDate}
                    name="fecha"
                    display="calendar"
                    mode="date"
                    onConfirm={(date) => {
                      handleDateConfirm(date);
                      formik.setFieldValue("fecha", date);
                    }}
                    onCancel={hideDatePicker}
                  />
                </TouchableOpacity>
                {formik.errors.fecha && (
                  <CustumErrorInput message={formik.errors.fecha} />
                )}
              </View>
              <View>
                <Text style={styles.label}>Hora Inicio del turno</Text>
                <TouchableOpacity
                  style={stylesGral.input}
                  onPress={showTimePicker}
                >
                  {selectedTime && (
                    <Text>
                      {selectedTime.toLocaleTimeString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  )}
                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    value={selectedTime}
                    name="horaInicio"
                    mode="time"
                    display="spinner"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                    onChange={(value) => {
                      const selected = new Date(value.nativeEvent.timestamp);
                      setSelectedTime(selected);
                      formik.setFieldValue("horaInicio", selected); // Actualiza el valor de hora en formik
                    }}
                  />
                </TouchableOpacity>
                {formik.errors.horaInicio && (
                  <CustumErrorInput message={formik.errors.horaInicio} />
                )}
              </View>
              <View>
                <Text style={styles.label}>Hora fin del turno</Text>
                <TouchableOpacity
                  style={stylesGral.input}
                  onPress={showTimeEndPicker}
                >
                  {selectedTime && (
                    <Text>
                      {selectedTimeEnd.toLocaleTimeString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  )}
                  <DateTimePickerModal
                    isVisible={isTimeEndPickerVisible}
                    value={selectedTimeEnd}
                    name="horaFin"
                    mode="time"
                    display="spinner"
                    onConfirm={handleTimeEndConfirm}
                    onCancel={hideTimeEndPicker}
                    onChange={(value) => {
                      const selected = new Date(value.nativeEvent.timestamp);
                      setSelectedTimeEnd(selected);
                      formik.setFieldValue("horaFin", selected); // Actualiza el valor de hora en formik
                    }}
                  />
                </TouchableOpacity>
                {formik.errors.horaFin && (
                  <CustumErrorInput message={formik.errors.horaFin} />
                )}
              </View>

              <View>
                <Text style={styles.label}>Categoria de los jugadores</Text>
                <TextInput
                  style={stylesGral.input}
                  name="categoria"
                  keyboardType="numeric"
                  placeholder="Ingrese la categoria de los jugadores del turno"
                  placeholderTextColor="grey"
                  onChangeText={(value) => {
                    const numericValue = parseInt(value, 10);
                    if (!isNaN(numericValue)) {
                      formik.setFieldValue("categoria", numericValue);
                    }
                  }}
                />
                {formik.errors.categoria && (
                  <CustumErrorInput message={formik.errors.categoria} />
                )}
              </View>
              <View>
                <Text style={styles.label}>Ingrese el tipo de cancha</Text>
                <TextInput
                  style={stylesGral.input}
                  name="tipoCancha"
                  placeholder="Cesped o Cemento"
                  placeholderTextColor="grey"
                  onChangeText={(value) =>
                    formik.setFieldValue(
                      "tipoCancha",
                      value
                        .toUpperCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .trim()
                    )
                  }
                />
                {formik.errors.tipoCancha && (
                  <CustumErrorInput message={formik.errors.tipoCancha} />
                )}
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View>
              <View style={styles.button}>
                <Button
                  title="Crear turno"
                  onPress={formik.handleSubmit}
                  disabled={formik.isSubmitting}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    VOLVER A INICIO
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <CustomModalSucces
        activeModal={activeModal}
        text={textModal}
        handleSuccessCloseModal={handleSuccessCloseModal}
      />
      <CustomModal
        activeErrorModal={activeErrorModal}
        handleCloseModal={handleCloseModal}
        text={state.errorMessage}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  containerInputs: {
    flex: 1,
    marginTop: 10,
    marginLeft: 12,
    marginRight: 12,
  },
  text: {
    fontSize: 20,
    color: "white",

    backgroundColor: "black",
    fontWeight: "bold",
    alignSelf: "center",
    margin: 1,
  },
  label: {
    marginLeft: 12,
    color: "white",
  },
  button: {
    width: 150,
    alignSelf: "center",
    margin: 15,
  },
});
