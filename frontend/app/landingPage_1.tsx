"use client"
import React from "react"
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, Dimensions } from "react-native"
import { useRouter } from "expo-router"

const IMAGES = [
  require("../assets/images/Farmers market-rafiki.png"),
  require("../assets/images/farm tractor-rafiki.png"),
  require("../assets/images/Farmer-rafiki.png"),
  require("../assets/images/fruit basket-rafiki.png"),
]

const { width: SCREEN_WIDTH } = Dimensions.get("window")

const LandingPage1 = () => {
  const router = useRouter()

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageGrid}>
            <View style={styles.imageRow}>
              <View style={[styles.imageWrapper, styles.topLeftImage]}>
                <Image source={IMAGES[0]} style={styles.image} resizeMode="contain" />
              </View>
              <View style={[styles.imageWrapper, styles.topRightImage]}>
                <Image source={IMAGES[1]} style={styles.image} resizeMode="contain" />
              </View>
            </View>
            <View style={styles.imageRow}>
              <View style={[styles.imageWrapper, styles.bottomLeftImage]}>
                <Image source={IMAGES[2]} style={styles.image} resizeMode="contain" />
              </View>
              <View style={[styles.imageWrapper, styles.bottomRightImage]}>
                <Image source={IMAGES[3]} style={styles.image} resizeMode="contain" />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.curvedBackground}>
            <View style={styles.textContent}>
              <Text style={styles.title}>Smart Solutions for Farmers to Maximize Their Profits</Text>
              <Text style={styles.description}>
                GoviShakthi empowers you with intelligent tools to create alternative products, access key markets, and
                forecast prices effectively
              </Text>
            </View>

            <View style={styles.footer}>
              <View style={styles.pagination}>
                <View style={[styles.progressBar, styles.activeProgress]} />
                <View style={styles.progressBar} />
              </View>
              <TouchableOpacity style={styles.button} onPress={() => router.push("/landingPage_2")}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  imageGrid: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  imageWrapper: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  topLeftImage: {
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_WIDTH * 0.35,
    borderRadius: 25,
  },
  topRightImage: {
    width: SCREEN_WIDTH * 0.45,
    height: SCREEN_WIDTH * 0.35,
    borderRadius: 25,
  },
  bottomLeftImage: {
    width: SCREEN_WIDTH * 0.45,
    height: SCREEN_WIDTH * 0.35,
    borderRadius: 25,
  },
  bottomRightImage: {
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_WIDTH * 0.35,
    borderRadius: 25,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bottomSection: {
    height: SCREEN_WIDTH * 0.8,
    position: "relative",
  },
  curvedBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "#02C39A",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
  },
  textContent: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
  },
  pagination: {
    flexDirection: "row",
    gap: 4,
    width: 40,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#C0C0C0",
    borderRadius: 100,
  },
  activeProgress: {
    backgroundColor: "#000000",
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonText: {
    color: "#02C39A",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default LandingPage1