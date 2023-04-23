import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { ISocialLoginConfig, OnErrorFunc, SocialLoginFinishHandler, ValidatorHandler } from '../../types';
import InputLogin from '../InputLogin';
import { IPhoneCountry, LoginFinishWithoutPin } from '../types';
import SocialLogin from '../SocialLogin';
import { GuardianInputInfo } from '../types/signIn';
import clsx from 'clsx';
import ConfigProvider from '../config-provider';
import './index.less';

enum STEP {
  socialLogin,
  inputLogin,
}

export interface SignUpBaseProps {
  phoneCountry?: IPhoneCountry;
  socialLogin?: ISocialLoginConfig;
  isErrorTip?: boolean;
  wrapperClassName?: string;
  termsOfServiceUrl?: string;
  hasPortkey?: boolean;
  onLoginByPortkey?: LoginFinishWithoutPin;
  onBack?: () => void;
  onError?: OnErrorFunc;
  onInputFinish?: (data: GuardianInputInfo) => void;
  validateEmail?: ValidatorHandler;
  validatePhone?: ValidatorHandler;
  onSocialSignFinish?: SocialLoginFinishHandler;
}

export default function SignUpBase({
  socialLogin,
  phoneCountry,
  isErrorTip,
  hasPortkey,
  wrapperClassName,
  termsOfServiceUrl,
  onBack,
  onError,
  onInputFinish,
  validateEmail,
  validatePhone,
  onSocialSignFinish,
  onLoginByPortkey,
}: SignUpBaseProps) {
  const [step, setStep] = useState<STEP>(STEP.socialLogin);

  const onBackRef = useRef<SignUpBaseProps['onBack']>();
  const _socialLogin = useMemo(() => socialLogin || ConfigProvider.getSocialLoginConfig(), [socialLogin]);

  useEffect(() => {
    onBackRef.current = onBack;
  });

  const _onBack = useCallback(() => {
    setStep(STEP.socialLogin);
    onBackRef?.current?.();
  }, []);

  return (
    <div className={clsx('register-start-card sign-ui-card', wrapperClassName)}>
      {step === STEP.inputLogin ? (
        <InputLogin
          type="Sign up"
          phoneCountry={phoneCountry}
          validateEmail={validateEmail}
          validatePhone={validatePhone}
          onFinish={onInputFinish}
          onBack={() => setStep(STEP.socialLogin)}
        />
      ) : (
        <SocialLogin
          hasPortkey={hasPortkey}
          type="Sign up"
          className="flex-1"
          termsOfServiceUrl={termsOfServiceUrl}
          isErrorTip={isErrorTip}
          socialLogin={_socialLogin}
          onFinish={onSocialSignFinish}
          switchGuardinType={() => setStep(STEP.inputLogin)}
          onBack={_onBack}
          onError={onError}
          onLoginByPortkey={onLoginByPortkey}
        />
      )}
    </div>
  );
}
