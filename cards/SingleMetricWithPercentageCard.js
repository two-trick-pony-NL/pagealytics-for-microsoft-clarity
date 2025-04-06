import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

export default function SingleMetricWithPercentageCard({ label, count, sessionwithMetricPercentage, description }) {
  const [showDescription, setShowDescription] = useState(false)

  // Check if the count has decimals and format accordingly
  const formattedCount = count % 1 === 0 ? count : Number(count).toFixed(2)

  // Check if sessionwithMetricPercentage is valid (a number and not NaN)
  const validPercentage = !isNaN(sessionwithMetricPercentage) && sessionwithMetricPercentage >= 0 && sessionwithMetricPercentage <= 100
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Pressable
          style={styles.infoButton}
          onPress={() => setShowDescription(!showDescription)}
        >
          <Text style={styles.infoText}>?</Text>
        </Pressable>

        <Text style={styles.count}>{formattedCount}</Text>
        <Text style={styles.label}>{label}</Text>

        {/* Render percentage only if it's valid */}
        {validPercentage && (
          <Text style={styles.percentagelabel}>
            {sessionwithMetricPercentage}% of traffic
          </Text>
        )}
      </View>
      {showDescription && description ? (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{description}</Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    paddingTop: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  infoButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#e5e7eb',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#111',
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  percentagelabel: {
    marginTop: 8,
    fontSize: 20,
    color: '#000',
  },
  toast: {
    backgroundColor: '#f3f4f6',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'center',
    maxWidth: '90%',
  },
  toastText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
})
