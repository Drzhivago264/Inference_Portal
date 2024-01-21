from django import forms
from captcha.fields import CaptchaField
    
class CaptchaForm(forms.Form):
    captcha = CaptchaField()
    def __init__ (self,  *args, **kwargs):
        self.title = "Captcha (math):"
        super (CaptchaForm, self).__init__ (*args, **kwargs) 
    