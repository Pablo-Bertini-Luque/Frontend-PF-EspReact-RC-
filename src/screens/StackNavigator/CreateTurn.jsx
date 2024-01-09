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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

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
      categoria: 1,
      tipoCancha: "",
      fecha: "",
      horaInicio: "",
      horaFin: "",
    },
    validationSchema: Yup.object({
      lugar: Yup.string()
        .required("El nombre del lugar de juego es obligatorio")
        .min(5, "El nombre debe tener un mínimo de 5 caracteres"),
      categoria: Yup.number()
        .required("La categoria es obligatoria. Ingrese un numero del 1 al 8")
        .min(1, "La categoria mínima es 1")
        .max(8, "La categoria máxima es 8")
        .typeError("Solamente se permiten ingresar numeros"),
      tipoCancha: Yup.string().required("Debe ingresar el tipo de cancha"),
    }),
    onSubmit: (values) => {
      console.log("Ingresa al onSubmit");

      try {
        newTurn(
          formik.values.lugar,
          formik.values.categoria,
          formik.values.tipoCancha
        );
      } catch (error) {
        console.error(error);
      }
    },
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleStartTimeConfirm = (time) => {
    setSelectedStartTime(time);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleEndTimeConfirm = (time) => {
    setSelectedEndTime(time);
    hideEndTimePicker();
  };

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
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                    onChange={(value) => formik.setFieldValue("fecha", value)}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.label}>Hora de inicio del turno</Text>
                <TouchableOpacity
                  style={stylesGral.input}
                  onPress={showStartTimePicker}
                >
                  {selectedStartTime && (
                    <Text>
                      {selectedStartTime.toLocaleTimeString("es-Arg", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  )}
                  <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    value={selectedStartTime}
                    mode="time"
                    display="spinner"
                    onConfirm={handleStartTimeConfirm}
                    onCancel={hideStartTimePicker}
                    onChange={(value) =>
                      formik.setFieldValue("horaInicio", value)
                    }
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.label}>Hora de finalizacion del turno</Text>
                <TouchableOpacity
                  style={stylesGral.input}
                  onPress={showEndTimePicker}
                >
                  {selectedEndTime && (
                    <Text>
                      {selectedEndTime.toLocaleTimeString("es-Arg", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  )}
                  <DateTimePickerModal
                    isVisible={isEndTimePickerVisible}
                    value={selectedEndTime}
                    mode="time"
                    display="spinner"
                    onConfirm={handleEndTimeConfirm}
                    onCancel={hideEndTimePicker}
                    onChange={(value) => formik.setFieldValue("horaFin", value)}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.label}>Categoria de los jugadores</Text>
                <TextInput
                  style={stylesGral.input}
                  name="categoria"
                  placeholder="Ingrese la categoria de los jugadores del turno"
                  placeholderTextColor="grey"
                  onChangeText={(value) =>
                    formik.setFieldValue("categoria", value)
                  }
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
            <View style={styles.button}>
              <Button
                title="Crear turno"
                onPress={() => formik.handleSubmit()}
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
