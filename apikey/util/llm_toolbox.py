import dspy
class Emotion(dspy.Signature):
    """Classify emotion among sadness, joy, love, anger, fear, surprise, neutral."""
    
    sentence = dspy.InputField(desc = "sentence that may contain emotion")
    emotion = dspy.OutputField(desc="return the emotion among the provided list of emotion")

class TopicClassification(dspy.Signature):
    """Classify topic"""
    document = dspy.InputField(desc = "document that may contain emotion")
    topic = dspy.OutputField(desc="return the topic of the document")