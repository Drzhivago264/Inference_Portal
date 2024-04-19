import dspy
class Emotion(dspy.Signature):
    """Classify emotion among sadness, joy, love, anger, fear, surprise, neutral."""
    
    sentence = dspy.InputField(desc = "sentence that may contain emotion")
    emotion = dspy.OutputField(desc="return the emotion among the provided list of emotion")

class TopicClassification(dspy.Signature):
    """Classify topic"""
    document = dspy.InputField(desc = "document that may contain a topic")
    topic = dspy.OutputField(desc="return the topic of the document")

class ParaphaseDocument(dspy.Signature):
    """Paraphrase document"""
    document = dspy.InputField(desc = "document that needs to be paraphrased")
    paraphased = dspy.OutputField(desc="return the paraphased document")

class SummarizeDocument(dspy.Signature):
    """Compress document in 50 words"""
    document = dspy.InputField(desc = "document that needs to be compressed in a specific number of word")
    summary = dspy.OutputField(desc="return the compressed document")

class ChangeWrittingStyle(dspy.Signature):
    """Writing document in happier style"""
    document = dspy.InputField(desc = "document that needs to be written in a new style")
    styled = dspy.OutputField(desc="return the document in new style")