import { StyleSheet } from 'react-native';

const ChatScreenStyle = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: { paddingBottom: 100 },
  chatItem: {
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 10,
  },
  chatText: { fontSize: 16, color: '#333' },

  bottomButtonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#4a90e2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
});

export default ChatScreenStyle;
