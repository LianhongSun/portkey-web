import {
  ConfigProvider,
  SignUpAndLogin,
  SetPinAndAddManager,
  VerifierSelect,
  CodeVerify,
  GuardianApproval,
  PortkeyLoading,
  UserInput,
  SignIn,
  Web2Design,
} from '@portkey/did-ui-react';
import { useState } from 'react';
import { Store } from '../../utils';
import { OperationTypeEnum } from '@portkey/services';

const myStore = new Store();
ConfigProvider.setGlobalConfig({
  storageMethod: myStore,
  graphQLUrl: '/AElfIndexer_DApp/PortKeyIndexerCASchema/graphql',
  network: {
    defaultNetwork: 'TESTNET',
    networkList: [
      {
        name: 'aelf Testnet',
        walletType: 'aelf',
        networkType: 'TESTNET',
        isActive: true,
        apiUrl: '',
        graphQLUrl: '/AElfIndexer_DApp/PortKeyIndexerCASchema/graphql',
        connectUrl: '',
      },
    ],
  },
});

function Example() {
  const [isLoading, setLoading] = useState<any>();
  const [dark, setDark] = useState<boolean>(true);
  return (
    <div id={dark && 'ids'}>
      <button
        onClick={async () => {
          setLoading(true);
        }}>
        ShowLoading
      </button>
      <button
        onClick={async () => {
          setDark(v => !v);
        }}>
        change theme
      </button>
      <PortkeyLoading
        loading={isLoading}
        loadingText={'Synchronizing on-chain account information...'}
        cancelable
        onCancel={() => setLoading(false)}
      />
      <div style={{ background: dark ? '#101217' : '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: 10 }}>
          <SignUpAndLogin
            style={{ height: 600, border: '1px solid gray' }}
            termsOfService={'https://portkey.finance/terms-of-service'}
            onError={(error: any) => {
              console.log('onError', error);
            }}
            onSuccess={(value: any) => {
              console.log('onSuccess:', value);
            }}
          />
          <UserInput
            style={{ height: 600, border: '1px solid gray' }}
            termsOfService={'https://portkey.finance/terms-of-service'}
            onError={(error: any) => {
              console.log('onError', error);
            }}
            onSuccess={(value: any) => {
              console.log('onSuccess:', value);
            }}
          />
          <VerifierSelect
            guardianIdentifier={'105383420233267798964'}
            accountType={'Google'}
            onError={(error: any) => {
              console.log('VerifierSelect:Error', error);
            }}
            onConfirm={result => {
              console.log('VerifierSelect:onConfirm', result);
            }}
          />
          <SetPinAndAddManager
            guardianApprovedList={[]}
            type={'recovery'}
            guardianIdentifier={'105383420233267798964'}
            onError={(error: any) => {
              console.log('SetPinAndAddManager:onError', error);
            }}
            onFinish={result => {
              console.log('SetPinAndAddManager:onConfirm', result);
            }}
          />
          <CodeVerify
            chainId="AELF"
            isErrorTip
            accountType="Phone"
            verifier={{
              endPoints: ['http://192.168.66.240:16010'],
              verifierAddresses: ['2mBnRTqXMb5Afz4CWM2QakLRVDfaq2doJNRNQT1MXoi2uc6Zy3'],
              id: 'd0e2442158b870190362c8daea87a6687a59fef94937a88bd7dcb464e8e21025',
              name: 'Portkey',
              imageUrl: 'https://portkey-did.s3.ap-northeast-1.amazonaws.com/img/Portkey.png',
            }}
            verifierSessionId={'080bbdcd-73f5-45a6-b65b-0d067474756f'}
            guardianIdentifier={'+852 12233333'}
            operationType={1}
            onError={(error: any) => {
              console.log('SetPinAndAddManager:onError', error);
            }}
            onSuccess={result => {
              console.log('SetPinAndAddManager:onConfirm', result);
            }}
          />
          <GuardianApproval
            chainId="AELF"
            operationType={OperationTypeEnum.communityRecovery}
            wrapperStyle={{ height: 600 }}
            guardianList={[
              {
                isLoginGuardian: true,
                verifier: {
                  endPoints: ['http://192.168.66.240:16010'],
                  verifierAddresses: ['2mBnRTqXMb5Afz4CWM2QakLRVDfaq2doJNRNQT1MXoi2uc6Zy3'],
                  id: 'd0e2442158b870190362c8daea87a6687a59fef94937a88bd7dcb464e8e21025',
                  name: 'Portkey',
                  imageUrl: 'https://portkey-did.s3.ap-northeast-1.amazonaws.com/img/Portkey.png',
                },
                identifier: 'identifier',
                guardianType: 'Phone',
                key: '',
              },
            ]}
          />
        </div>
        <div style={{ background: dark ? '#1E212B' : '#fff' }}>
          <Web2Design
            phoneCountry={{
              iso: 'CN',
              countryList: [
                {
                  country: 'China',
                  code: '86',
                  iso: 'CN',
                },
                {
                  country: 'Denmark',
                  code: '45',
                  iso: 'DK',
                },
                {
                  country: 'France',
                  code: '33',
                  iso: 'FR',
                },
                {
                  country: 'Hong Kong',
                  code: '852',
                  iso: 'HK',
                },
                {
                  country: 'Mexico',
                  code: '52',
                  iso: 'MX',
                },
                {
                  country: 'Singapore',
                  code: '65',
                  iso: 'SG',
                },
                {
                  country: 'United Kingdom',
                  code: '44',
                  iso: 'GB',
                },
                {
                  country: 'United States',
                  code: '1',
                  iso: 'US',
                },
              ],
            }}
            termsOfService={'https://portkey.finance/terms-of-service'}
            onError={(error: any) => {
              console.log('onError', error);
            }}
            onSuccess={(value: any) => {
              console.log('onSuccess:', value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Example;
