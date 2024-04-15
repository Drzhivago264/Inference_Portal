from django import forms
from captcha.fields import CaptchaField, CaptchaTextInput
from apikey.util import constant

class CustomCaptchaTextInput(CaptchaTextInput):
    template_name = 'component_html/captcha.html'

class CaptchaForm(forms.Form):
    captcha = CaptchaField(widget=CustomCaptchaTextInput)
    def __init__ (self,  *args, **kwargs):
        self.title = "Captcha (math):"
        super (CaptchaForm, self).__init__ (*args, **kwargs) 

class RoomRedirectForm(forms.Form):
    #CHOICES = [('chat','Chat Bot Mode'),('engineer','Agent Mode')]
    CHOICES = [('chat','Chat Bot Mode'),('engineer','Agent Mode'),('hotpot', 'Hotpot Mode'), ('toolbox', 'LLM backend functions')]
    room = forms.ChoiceField(widget=forms.RadioSelect, choices=CHOICES, required=True)
    key = forms.CharField( widget=forms.PasswordInput(attrs={'placeholder': 'Key'}))
    def clean(self):
        cleaned_data = super(RoomRedirectForm, self).clean()
        room = cleaned_data.get('room')
        key = cleaned_data.get('key')
        if not room or not key:
            raise forms.ValidationError('Corret your Key and choose a Mode')
        
class LogForm(forms.Form):
    key_ = forms.CharField( widget=forms.PasswordInput(attrs={'placeholder': 'Key'}))
    key_name = forms.CharField( widget=forms.TextInput(attrs={'placeholder': 'Key Name'}))
    captcha = CaptchaField(label="Captcha(Math): ")
    
class PromptForm(forms.Form):

    GENERATION_CHOICES = [('chat','Chat Bot Mode'),('generate','Text Completion')]
    MODEL_CHOICES = [('Reddit Helper 2.7B','Reddit Helper 2.7B'),('4Chan /Pol 2.7B','Text Completion'),('Mistral Chat 13B', 'Mistral Chat 13B'),('Llama 2 Chat 13B','Llama 2 Chat 13B')]

    key = forms.CharField(required=True, widget=forms.PasswordInput(attrs={'placeholder': 'Key'}))
    key_name = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Key Name'}))
    prompt = forms.CharField(required=True, widget=forms.Textarea(attrs={"style":"width:100%; height:100px"}))
    
    include_memory = forms.BooleanField(required=False, widget=forms.CheckboxInput(attrs={'checked': True}),  initial=constant.DEFAULT_MEMORY)
    mode = forms.ChoiceField(widget=forms.RadioSelect, choices=GENERATION_CHOICES, required=True, initial=constant.DEFAULT_MODE)
    model = forms.ChoiceField(widget=forms.RadioSelect, choices=MODEL_CHOICES, required=True, initial=constant.DEFAULT_MODEL)
    top_p = forms.FloatField(widget=forms.NumberInput(attrs={'type':'range', 'step': '0.001', 'min': '0.001', 'max':'1','oninput':'this.nextElementSibling.value = this.value'}), initial=constant.DEFAULT_TOP_P)
    top_k = forms.IntegerField(widget=forms.NumberInput(attrs={'type':'range', 'step': '1', 'min': '1', 'max':'100','oninput':'this.nextElementSibling.value = this.value'}), initial=constant.DEFAULT_TOP_K)
    temperature = forms.FloatField(widget=forms.NumberInput(attrs={'type':'range', 'step': '0.001', 'min': '0', 'max':'1','oninput':'this.nextElementSibling.value = this.value'}), initial=constant.DEFAULT_TEMPERATURE)
    max_tokens = forms.IntegerField(widget=forms.NumberInput(attrs={'type':'range', 'step': '1', 'min': '1', 'max':'4069', 'oninput':'this.nextElementSibling.value = this.value'}), initial=constant.DEFAULT_MAX_TOKENS)
    frequency_penalty = forms.FloatField(widget=forms.NumberInput(attrs={'type':'range', 'step': '0.001', 'min': '-2', 'max':'2','oninput':'this.nextElementSibling.value = this.value'}), initial=constant.DEFAULT_FREQUENCY_PENALTY)
    presence_penalty = forms.FloatField(widget=forms.NumberInput(attrs={'type':'range', 'step': '0.001', 'min': '-2', 'max':'2','oninput':'this.nextElementSibling.value = this.value'}), initial=constant.DEFAULT_PRESENCE_PENALTY)
    length_penalty = forms.FloatField(widget=forms.NumberInput(attrs={'type':'number', 'step': '0.001', 'min': '-2', 'max':'2'}), initial=constant.DEFAULT_LENGTH_PENALTY)
    beam = forms.BooleanField(required=False, widget=forms.CheckboxInput(attrs={'checked': False}),  initial=constant.DEFAULT_BEAM)
    early_stopping = forms.BooleanField(required=False,widget=forms.CheckboxInput(attrs={'checked': False}) ,initial=constant.DEFAULT_EARLY_STOPPING)
    best_of = forms.IntegerField(widget=forms.NumberInput(attrs={'type':'number', 'step': '1', 'min': '1', 'max':'5'}), initial=constant.DEFAULT_BEST_OF)


    