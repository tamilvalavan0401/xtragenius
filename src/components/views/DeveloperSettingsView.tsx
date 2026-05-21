import React, { useState, useEffect } from 'react';
import SvgIcons from '@/components/SvgIcons';
import { Link } from 'react-router-dom';
import axiosInstance, { AK } from '@/api/axiosInstance';
import { Bars } from 'react-loader-spinner';

interface GatewayConfig {
  gateway: string;
  webhook: boolean;
  gatewayid: number;
  webhook_url: string;
  whitelisted: boolean;
  encryption_key: string;
  webhook_secret: string | null;
  whitelisted_ip: string;
}

interface FieldError {
  [key: string]: string[];
}

export const DeveloperSettingsView = () => {
  const [apiKey, setApiKey] = useState('');
  const [gatewayConfigs, setGatewayConfigs] = useState<GatewayConfig[]>([]);
  const [audits, setAudits] = useState([]);
  const [apiLastGenerated, setApiLastGenerated] = useState('');
  const [encryptionLastGenerated, setEncryptionLastGenerated] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<number, FieldError>>({});
  const [generalError, setGeneralError] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isApiKeyCopied, setIsApiKeyCopied] = useState(false);
  const [showEncryptionKeys, setShowEncryptionKeys] = useState<Record<number, boolean>>({});
  const [isIpCopied, setIsIpCopied] = useState<Record<number, boolean>>({});
  const [isSecretCopied, setIsSecretCopied] = useState<Record<number, boolean>>({});
  const [isEncryptionCopied, setIsEncryptionCopied] = useState<Record<number, boolean>>({});
  const [isApiKeyLoading, setIsApiKeyLoading] = useState(false);
  const [isEncryptionLoading, setIsEncryptionLoading] = useState<Record<number, boolean>>({});
  const [isWebhookLoading, setIsWebhookLoading] = useState<Record<number, boolean>>({});
  const [isIpLoading, setIsIpLoading] = useState<Record<number, boolean>>({});
  const [isPopupOpen, setIsPopupOpen] = useState<Record<number, boolean>>({});
  const [tempWebhookUrl, setTempWebhookUrl] = useState('');
  const [tempWebhookSecret, setTempWebhookSecret] = useState('');

  // Fetch initial data on mount
  useEffect(() => {
    const fetchDeveloperSettings = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post(AK.DEVELOPER_SETTINGS, null);
        const { success, data } = response.data;
        if (success) {
          setApiKey(data.api_key || '');
          setGatewayConfigs(data.gateway_config || []);
          setAudits(data.audits || []);
          const updatedDate = new Date(data.updated_at);
          const formattedDate = updatedDate.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
          setApiLastGenerated(formattedDate);
          setEncryptionLastGenerated(formattedDate);

          // Initialize states
          const initialVisibility: Record<number, boolean> = {};
          const initialEncryptionLoading: Record<number, boolean> = {};
          const initialWebhookLoading: Record<number, boolean> = {};
          const initialIpLoading: Record<number, boolean> = {};
          const initialCopied: Record<number, boolean> = {};
          const initialPopupOpen: Record<number, boolean> = {};

          data.gateway_config.forEach((config: GatewayConfig) => {
            initialVisibility[config.gatewayid] = false;
            initialEncryptionLoading[config.gatewayid] = false;
            initialWebhookLoading[config.gatewayid] = false;
            initialIpLoading[config.gatewayid] = false;
            initialCopied[config.gatewayid] = false;
            initialPopupOpen[config.gatewayid] = false;
          });

          setShowEncryptionKeys(initialVisibility);
          setIsEncryptionLoading(initialEncryptionLoading);
          setIsWebhookLoading(initialWebhookLoading);
          setIsIpLoading(initialIpLoading);
          setIsIpCopied(initialCopied);
          setIsSecretCopied(initialCopied);
          setIsEncryptionCopied(initialCopied);
          setIsPopupOpen(initialPopupOpen);
        }
      } catch (error) {
        setError('Failed to fetch developer settings.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeveloperSettings();
  }, []);

  const copyToClipboard = (text: string, setCopied: (val: any) => void, gatewayId?: number) => {
    if (text) {
      navigator.clipboard.writeText(text);
      if (gatewayId !== undefined) {
        setCopied((prev: any) => ({ ...prev, [gatewayId]: true }));
        setTimeout(() => setCopied((prev: any) => ({ ...prev, [gatewayId]: false })), 2000);
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const clearGatewayErrors = (gatewayId: number) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[gatewayId];
      return newErrors;
    });
  };

  const clearGeneralError = () => {
    setGeneralError('');
  };

  const updateWhitelistedIp = (gatewayId: number, ip: string) => {
    setGatewayConfigs(prev =>
      prev.map(config =>
        config.gatewayid === gatewayId
          ? { ...config, whitelisted_ip: ip, whitelisted: !!ip }
          : config
      ) as GatewayConfig[]
    );
  };

  const updateWebhookUrl = (gatewayId: number, url: string) => {
    setGatewayConfigs(prev =>
      prev.map(config =>
        config.gatewayid === gatewayId
          ? { ...config, webhook_url: url, webhook: !!url }
          : config
      ) as GatewayConfig[]
    );
  };

  const updateWebhookSecret = (gatewayId: number, secret: string) => {
    setGatewayConfigs(prev =>
      prev.map(config =>
        config.gatewayid === gatewayId
          ? { ...config, webhook_secret: secret }
          : config
      ) as GatewayConfig[]
    );
  };

  const handleRegenerateApiKey = async () => {
    setIsApiKeyLoading(true);
    clearGeneralError();
    try {
      const formdata = new FormData();
      formdata.append("source", "api_key");
      const response = await axiosInstance.post(AK.UPDATE_SETTINGS, formdata);
      const { success, message, data, errors } = response.data;

      if (success) {
        setApiKey(data.api_key || apiKey);
        const updatedDate = new Date();
        setApiLastGenerated(updatedDate.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }));
      } else {
        if (errors) {
          setGeneralError(message || 'Validation error');
        } else {
          setGeneralError(message || 'Failed to regenerate API key.');
        }
      }
    } catch (error: any) {
      const response = error.response?.data;
      if (response && !response.success) {
        if (response.errors) {
          setGeneralError(response.message || 'Validation error');
        } else {
          setGeneralError(response.message || 'Failed to regenerate API key.');
        }
      } else {
        setGeneralError('Failed to regenerate API key.');
      }
      console.error(error);
    } finally {
      setIsApiKeyLoading(false);
    }
  };

  const handleRegenerateEncryptionKey = async (gatewayId: number) => {
    setIsEncryptionLoading(prev => ({ ...prev, [gatewayId]: true }));
    clearGatewayErrors(gatewayId);
    try {
      const formdata = new FormData();
      formdata.append("source", "encryption_key");
      formdata.append("gateway_id", gatewayId.toString());
      const response = await axiosInstance.post(AK.UPDATE_SETTINGS, formdata);
      const { success, message, data, errors } = response.data;

      if (success) {
        setGatewayConfigs(prev =>
          prev.map(config =>
            config.gatewayid === gatewayId
              ? { ...config, encryption_key: data.encryption_key || config.encryption_key }
              : config
          ) as GatewayConfig[]
        );
        const updatedDate = new Date();
        setEncryptionLastGenerated(updatedDate.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }));
      } else {
        if (errors) {
          setFieldErrors(prev => ({ ...prev, [gatewayId]: errors }));
          setGeneralError(message || 'Validation error');
        } else {
          setGeneralError(message || 'Failed to regenerate encryption key.');
        }
      }
    } catch (error: any) {
      const response = error.response?.data;
      if (response && !response.success) {
        if (response.errors) {
          setFieldErrors(prev => ({ ...prev, [gatewayId]: response.errors }));
          setGeneralError(response.message || 'Validation error');
        } else {
          setGeneralError(response.message || 'Failed to regenerate encryption key.');
        }
      } else {
        setGeneralError('Failed to regenerate encryption key.');
      }
      console.error(error);
    } finally {
      setIsEncryptionLoading(prev => ({ ...prev, [gatewayId]: false }));
    }
  };

  const handleUpdateWebhook = async (gatewayId: number) => {
    setIsWebhookLoading(prev => ({ ...prev, [gatewayId]: true }));
    clearGatewayErrors(gatewayId);
    try {
      const formdata = new FormData();
      formdata.append("source", "webhook");
      formdata.append("gateway_id", gatewayId.toString());
      formdata.append("webhook_url", tempWebhookUrl || '');
      formdata.append("webhook_secret", tempWebhookSecret || '');
      const response = await axiosInstance.post(AK.UPDATE_SETTINGS, formdata);
      const { success, message, data, errors } = response.data;

      if (success) {
        setGatewayConfigs(prev =>
          prev.map(config =>
            config.gatewayid === gatewayId
              ? { ...config, webhook_url: tempWebhookUrl, webhook_secret: tempWebhookSecret, webhook: !!tempWebhookUrl }
              : config
          ) as GatewayConfig[]
        );
        setIsPopupOpen(prev => ({ ...prev, [gatewayId]: false }));
      } else {
        if (errors) {
          setFieldErrors(prev => ({ ...prev, [gatewayId]: errors }));
          setGeneralError(message || 'Validation error');
        } else {
          setGeneralError(message || 'Failed to update webhook.');
        }
      }
    } catch (error: any) {
      const response = error.response?.data;
      if (response && !response.success) {
        if (response.errors) {
          setFieldErrors(prev => ({ ...prev, [gatewayId]: response.errors }));
          setGeneralError(response.message || 'Validation error');
        } else {
          setGeneralError(response.message || 'Failed to update webhook.');
        }
      } else {
        setGeneralError('Failed to update webhook.');
      }
      console.error(error);
    } finally {
      setIsWebhookLoading(prev => ({ ...prev, [gatewayId]: false }));
    }
  };

  const handleUpdateWhitelistedIp = async (gatewayId: number, ip: string) => {
    setIsIpLoading(prev => ({ ...prev, [gatewayId]: true }));
    clearGatewayErrors(gatewayId);
    try {
      const formdata = new FormData();
      formdata.append("source", "whitelisted_ip");
      formdata.append("gateway_id", gatewayId.toString());
      formdata.append("ip", ip);
      const response = await axiosInstance.post(AK.UPDATE_SETTINGS, formdata);
      const { success, message, data, errors } = response.data;

      if (success) {
        updateWhitelistedIp(gatewayId, ip);
      } else {
        if (errors) {
          setFieldErrors(prev => ({ ...prev, [gatewayId]: errors }));
          setGeneralError(message || 'Validation error');
        } else {
          setGeneralError(message || 'Failed to update whitelisted IP.');
        }
      }
    } catch (error: any) {
      const response = error.response?.data;
      if (response && !response.success) {
        if (response.errors) {
          setFieldErrors(prev => ({ ...prev, [gatewayId]: response.errors }));
          setGeneralError(response.message || 'Validation error');
        } else {
          setGeneralError(response.message || 'Failed to update whitelisted IP.');
        }
      } else {
        setGeneralError('Failed to update whitelisted IP.');
      }
      console.error(error);
    } finally {
      setIsIpLoading(prev => ({ ...prev, [gatewayId]: false }));
    }
  };

  const toggleEncryptionKeyVisibility = (gatewayId: number) => {
    setShowEncryptionKeys(prev => ({
      ...prev,
      [gatewayId]: !prev[gatewayId]
    }));
  };

  const getFieldError = (gatewayId: number, fieldName: string) => {
    const gatewayErrors = fieldErrors[gatewayId];
    if (gatewayErrors && gatewayErrors[fieldName] && gatewayErrors[fieldName].length > 0) {
      return gatewayErrors[fieldName][0];
    }
    return '';
  };

  const openPopup = (gatewayId: number, webhookUrl: string, webhookSecret: string | null) => {
    setTempWebhookUrl(webhookUrl);
    setTempWebhookSecret(webhookSecret || '');
    setIsPopupOpen(prev => ({ ...prev, [gatewayId]: true }));
  };

  const closePopup = (gatewayId: number) => {
    setIsPopupOpen(prev => ({ ...prev, [gatewayId]: false }));
    clearGatewayErrors(gatewayId);
    setTempWebhookUrl('');
    setTempWebhookSecret('');
  };

  return (
    <div className="">
        <main className="">
          {generalError && (
            <div className="mb-4 p-3 bg-red-50 flex justify-between items-start border border-red-200 rounded-[8px]">
              <p className="text-red-600 text-sm font-medium">{generalError}</p>
              <button 
                onClick={clearGeneralError}
                className="text-red-600 text-xs hover:text-red-800 ml-2"
              >
                <SvgIcons.PopupClose/>
              </button>
            </div>
          )}

          <div className="rounded-[8px] mb-[12px] p-4 bg-[radial-gradient(59.63%_100%_at_50%_0%,_#1B469C_0%,_#001A4D_50.44%,_#011640_80.27%)]">
            <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between w-full">
              <div>
                <h1 className="text-white  text-[20px] font-bold leading-[20px] mb-[16px]">
                  Developer Settings
                </h1>
                <p className="text-white opacity-[0.8]  text-[14px] font-normal leading-[14px]">
                  Manage your API keys, webhooks, and integrations. Built for speed, security, and scalability.
                </p>
              </div>
              <Link
                to="#"
                target="_blank"
                className="inline-flex w-fit h-[36px] px-4 py-2 justify-center items-center gap-2 shrink-0 rounded bg-[#124CBE] text-white  text-[14px] font-medium leading-[15px]"
              >
                Download API Doc
              </Link>
            </div>
          </div>

          <div className="p-[16px] bg-white rounded-[8px] mb-[12px]">
            <div className="flex items-start justify-between">
              <p className="text-[#272727] text-center  text-[18px] font-semibold mb-[24px]">
                API
              </p>
              <div className="flex items-center gap-[8px]">
                <p className="text-[#272727] hidden md:block text-center  text-sm font-medium leading-[100%]">
                  API
                </p>
                <div className="flex items-center">
                  <label className="relative inline-block w-11 h-6 cursor-pointer">
                    <input type="checkbox" id="api-switch" className="peer sr-only" />
                    <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-[#124CBE] peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                    <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
                    <span className="absolute top-1/2 start-0.5 -translate-y-1/2 flex justify-center items-center size-5 text-gray-500 peer-checked:text-white transition-colors duration-200">
                      <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
                      </svg>
                    </span>
                    <span className="absolute top-1/2 end-0.5 -translate-y-1/2 flex justify-center items-center size-5 text-gray-500 peer-checked:text-[#284292] transition-colors duration-200 dark:text-neutral-500">
                      <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  </label>
                </div>
                <p className="text-[#284292]  text-xs font-normal flex px-1 py-[2px] justify-center items-center gap-2 rounded-sm bg-[#DAFED7]">
                  Active
                </p>
              </div>
            </div>
            <div className='w-full md:w-fit'>
              <div className="flex flex-col md:flex-row items-center md:items-end gap-[8px]">
                <div className='w-full md:w-fit'>
                  <label htmlFor="" className="text-[#626C89] mb-[8px]  text-[14px] font-normal">
                    API Key
                  </label>
                  <div className=" flex w-full items-center gap-[8px]">
                    <div className='relative w-full'>
                      <input
                        className="flex w-full md:w-[335px] h-[36px] px-3 py-2 justify-between items-center rounded border border-[#EBEBEB] text-black placeholder:text-[#737373] placeholder:text-[14px]"
                        type={showApiKey ? 'text' : 'password'}
                        value={apiKey}
                        placeholder="xxxxxxxx"
                        readOnly
                      />
                      <div className="absolute top-2 right-3 cursor-pointer" onClick={() => copyToClipboard(apiKey, setIsApiKeyCopied)}>
                        {isApiKeyCopied ? <span className="text-green-500 text-xs">Copied!</span> : <SvgIcons.CopyCode />}
                      </div>
                    </div>
                    <button className="flex w-10 h-9 justify-center items-center gap-[6px] rounded border border-[#EBEBEB] bg-white" onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? <SvgIcons.PasswordOpen /> : <SvgIcons.PasswordHide />}
                    </button>
                  </div>
                </div>
                <button 
                  className="flex w-full h-9 px-4 py-2 justify-center items-center gap-2 rounded bg-[#124CBE] text-white  text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={handleRegenerateApiKey} 
                  disabled={isApiKeyLoading}
                >
                  {isApiKeyLoading ? <Bars
                                    height="30"
                                    width="30"
                                    color="#fff"
                                    ariaLabel="bars-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                  /> : 'Generate'}
                </button>
                <div className='flex flex-row md:flex-col'>
                  <p className="text-[#626C89] whitespace-normal md:whitespace-nowrap  text-xs font-normal leading-[140%] mb-1">
                    Last Generated:
                  </p>
                  <p className="text-[#626C89]  whitespace-normal md:whitespace-nowrap  text-xs font-normal leading-[140%]">
                    {apiLastGenerated}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {gatewayConfigs.map((gatewayConfig) => {
            const gatewayId = gatewayConfig.gatewayid;
            const webhookError = getFieldError(gatewayId, 'webhook_url');
            const secretError = getFieldError(gatewayId, 'webhook_secret');
            const ipError = getFieldError(gatewayId, 'ip');

            return (
              <div key={gatewayId} className="p-[16px] bg-white rounded-[8px] mb-[12px]">
                {(webhookError || secretError || ipError) && (
                  <div className="mb-4 p-3 flex justify-between items-start bg-red-50 border border-red-200 rounded-[8px]">
                    <p className="text-red-600 text-sm font-medium">
                      {webhookError && `Webhook URL: ${webhookError}. `}
                      {secretError && `Webhook Secret: ${secretError}. `}
                      {ipError && `IP Address: ${ipError}. `}
                    </p>
                    <button 
                      onClick={() => clearGatewayErrors(gatewayId)}
                      className="text-red-600 text-xs hover:text-red-800 ml-2"
                    >
                      <SvgIcons.PopupClose/>
                    </button>
                  </div>
                )}

                <div className="flex mb- items-center justify-between">
                  <p className="text-[#272727] text-center  text-[18px] font-semibold mb-[24px]">
                    {gatewayConfig.gateway} Webhook
                  </p>
                  <div className="flex items-center gap-[8px]">
                    <p className="text-[#272727] hidden md:block text-center  text-sm font-medium leading-[100%]">
                      {gatewayConfig.gateway} Webhook
                    </p>
                    <div className="flex items-center">
                      <label className="relative inline-block w-11 h-6 cursor-pointer">
                        <input 
                          type="checkbox" 
                          id={`webhook-switch-${gatewayId}`} 
                          className="peer sr-only"
                          checked={gatewayConfig.webhook}
                          onChange={(e) => {
                            setGatewayConfigs(prev => 
                              prev.map(config => 
                                config.gatewayid === gatewayId
                                  ? { ...config, webhook: e.target.checked }
                                  : config
                              ) as GatewayConfig[]
                            );
                          }}
                        />
                        <span className={`absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out ${gatewayConfig.webhook ? 'bg-[#124CBE]' : ''} peer-disabled:opacity-50 peer-disabled:pointer-events-none`}></span>
                        <span className={`absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out ${gatewayConfig.webhook ? 'translate-x-full' : ''}`}></span>
                        <span className="absolute top-1/2 start-0.5 -translate-y-1/2 flex justify-center items-center size-5 text-gray-500 transition-colors duration-200">
                          <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
                          </svg>
                        </span>
                        <span className="absolute top-1/2 end-0.5 -translate-y-1/2 flex justify-center items-center size-5 text-gray-500 transition-colors duration-200 dark:text-neutral-500">
                          <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                      </label>
                    </div>
                    <p className={` text-xs font-normal flex px-1 py-[2px] justify-center items-center gap-2 rounded-sm ${gatewayConfig.webhook ? 'text-[#284292] bg-[#DAFED7]' : 'text-gray-500 bg-gray-100'}`}>
                      {gatewayConfig.webhook ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-start justify-between mb-[24px]">
                    <p className="text-[#272727]  text-[14px] font-semibold mb-[16px]">
                      Whitelist IP
                    </p>
                    <div className="flex items-center gap-[8px]">
                      <p className="text-[#272727] text-center  hidden md:block text-sm font-medium leading-[100%]">
                        Whitelist IP
                      </p>
                      <div className="flex items-center">
                        <label className="relative inline-block w-11 h-6 cursor-pointer">
                          <input
                            type="checkbox"
                            id={`whitelist-switch-${gatewayId}`}
                            className="peer sr-only"
                            checked={gatewayConfig.whitelisted}
                            onChange={(e) => {
                              setGatewayConfigs(prev => 
                                prev.map(config => 
                                  config.gatewayid === gatewayId
                                    ? { ...config, whitelisted: e.target.checked }
                                    : config
                                ) as GatewayConfig[]
                              );
                            }}
                          />
                          <span className={`absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out ${gatewayConfig.whitelisted ? 'bg-[#124CBE]' : ''} peer-disabled:opacity-50 peer-disabled:pointer-events-none`}></span>
                          <span className={`absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out ${gatewayConfig.whitelisted ? 'translate-x-full' : ''}`}></span>
                          <span className="absolute top-1/2 start-0.5 -translate-y-1/2 flex justify-center items-center size-5 text-gray-500 transition-colors duration-200">
                            <svg
                              className="shrink-0 size-3"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                          </span>
                          <span className="absolute top-1/2 end-0.5 -translate-y-1/2 flex justify-center items-center size-5 text-gray-500 transition-colors duration-200 dark:text-neutral-500">
                            <svg
                              className="shrink-0 size-3"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                        </label>
                      </div>
                      <p className={` text-xs font-normal flex px-1 py-[2px] justify-center items-center gap-2 rounded-sm ${gatewayConfig.whitelisted ? 'text-[#284292] bg-[#DAFED7]' : 'text-gray-500 bg-gray-100'}`}>
                        {gatewayConfig.whitelisted ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col w-full md:flex-row md:items-end gap-[8px] mb-[24px]">
                    <div className='w-full md:w-fit'>
                      <label htmlFor="" className="text-[#626C89] mb-[8px]  text-[14px] font-normal">
                        Whitelisted IP
                      </label>
                      <div className='flex items-center gap-2 w-full'>
                        <div className="relative w-full md:w-fit">
                          <input
                            className={`flex w-full md:w-[240px] h-[36px] px-3 py-2 justify-between items-center rounded border ${ipError ? 'border-red-500' : 'border-[#EBEBEB]'} text-black placeholder:text-[#737373] placeholder:text-[14px]`}
                            type="text"
                            value={gatewayConfig.whitelisted_ip}
                            onChange={(e) => {
                              updateWhitelistedIp(gatewayId, e.target.value);
                              if (ipError) clearGatewayErrors(gatewayId);
                            }}
                            placeholder="123.45.67.89"
                          />
                          <div className="absolute top-2 right-3 cursor-pointer" onClick={() => copyToClipboard(gatewayConfig.whitelisted_ip, setIsIpCopied, gatewayId)}>
                            {isIpCopied[gatewayId] ? <span className="text-green-500 text-xs">Copied!</span> : <SvgIcons.CopyCode />}
                          </div>
                        </div>
                        <button 
                          className="text-[#272727] flex h-9 px-3 py-2 justify-center items-center gap-1 rounded border border-[#EBEBEB] bg-white  text-sm font-medium leading-[15px] disabled:opacity-50 disabled:cursor-not-allowed" 
                          onClick={() => handleUpdateWhitelistedIp(gatewayId, gatewayConfig.whitelisted_ip)} 
                          disabled={isIpLoading[gatewayId]}
                        >
                          {isIpLoading[gatewayId] ? <Bars
                            height="30"
                            width="50"
                            color="#000"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          /> : <><SvgIcons.AddIcon /> Add</>}
                        </button>
                      </div>
                    </div>

                    <div className='w-full md:w-fit'>
                      <label htmlFor="" className="text-[#626C89] mb-[8px]  text-[14px] font-normal">
                        Encryption Key
                      </label>
                      <div className="flex flex-col md:flex-row w-full md:w-fit items-center gap-[8px]">
                        <div className='flex items-center gap-2 w-full md:w-[350px]'>
                          <div className='relative w-full'>
                            <input
                              className="flex w-full h-[36px] px-3 py-2 justify-between items-center rounded border border-[#EBEBEB] text-black placeholder:text-[#737373] placeholder:text-[14px]"
                              type={showEncryptionKeys[gatewayId] ? 'text' : 'password'}
                              value={gatewayConfig.encryption_key}
                              placeholder="xxxxxxxx"
                              readOnly
                            />
                            <div className="absolute top-2 right-3 cursor-pointer" onClick={() => copyToClipboard(gatewayConfig.encryption_key, setIsEncryptionCopied, gatewayId)}>
                              {isEncryptionCopied[gatewayId] ? <span className="text-green-500 text-xs">Copied!</span> : <SvgIcons.CopyCode />}
                            </div>
                          </div>
                          <button 
                            className="flex w-10 h-9 justify-center items-center gap-[6px] rounded border border-[#EBEBEB] bg-white" 
                            onClick={() => toggleEncryptionKeyVisibility(gatewayId)}
                          >
                            {showEncryptionKeys[gatewayId] ? <SvgIcons.PasswordOpen /> : <SvgIcons.PasswordHide />}
                          </button>
                        </div>
                        <button 
                          className="flex w-full md:w-auto h-9 px-4 py-2 justify-center items-center gap-2 rounded bg-[#124CBE] text-white  text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed" 
                          onClick={() => handleRegenerateEncryptionKey(gatewayId)} 
                          disabled={isEncryptionLoading[gatewayId]}
                        >
                          {isEncryptionLoading[gatewayId] ? <Bars
                            height="30"
                            width="30"
                            color="#fff"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          /> : 'Regenerate'}
                        </button>
                        <div className='flex flex-row md:flex-col'>
                          <p className="text-[#626C89] whitespace-normal md:whitespace-nowrap  text-xs font-normal leading-[140%] mb-1">
                            Last Generated:
                          </p>
                          <p className="text-[#626C89] whitespace-normal md:whitespace-nowrap  text-xs font-normal leading-[140%]">
                            {encryptionLastGenerated}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-[0.8px] bg-[#EBEBEB] w-full mt-[24px] mb-[11px]" />

                  <div className="flex mt-[16px] flex-col md:flex-row md:items-end gap-[8px] mb-[24px]">
                    <div className='w-full'>
                      <label htmlFor="" className="text-[#626C89] mb-[8px]  text-[14px] font-normal">
                        Webhook Secret
                      </label>
                      <div className='flex items-center gap-2 w-full'>
                        <div className="relative w-full md:w-[240px]">
                          <input
                            className={`flex w-full h-[36px] px-3 py-2 justify-between items-center rounded border ${secretError ? 'border-red-500' : 'border-[#EBEBEB]'} text-black placeholder:text-[#737373] placeholder:text-[14px]`}
                            type="text"
                            value={gatewayConfig.webhook_secret || ''}
                            onChange={(e) => {
                              updateWebhookSecret(gatewayId, e.target.value);
                              if (secretError) clearGatewayErrors(gatewayId);
                            }}
                            placeholder="xxxxxxxx"
                            disabled
                          />
                            <div className="absolute top-2 right-3 cursor-pointer" onClick={() => copyToClipboard(gatewayConfig.webhook_secret || '', setIsSecretCopied, gatewayId)}>
                            {isSecretCopied[gatewayId] ? <span className="text-green-500 text-xs">Copied!</span> : <SvgIcons.CopyCode />}
                          </div>
                        </div>
                        <button 
                          className="text-[#272727] flex h-9 px-3 py-2 justify-center items-center gap-1 rounded border border-[#EBEBEB] bg-white  text-sm font-medium leading-[15px] disabled:opacity-50 disabled:cursor-not-allowed" 
                          onClick={() => openPopup(gatewayId, gatewayConfig.webhook_url, gatewayConfig.webhook_secret)} 
                          disabled={isWebhookLoading[gatewayId]}
                        >
                          {isWebhookLoading[gatewayId] ? <Bars
                            height="30"
                            width="30"
                            color="#fff"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          /> : <><SvgIcons.EditIcon /> Edit</>}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#272727]  text-[14px] font-semibold mb-[16px]">
                      Callback URL
                    </p>
                    <div className="flex flex-col w-full lg:flex-row lg:items-end gap-[8px]">
                      <div className='w-full'>
                        <label htmlFor="" className="text-[#626C89] mb-[8px]  text-[14px] font-normal">
                          Webhook URL
                        </label>
                        <div className='flex items-center gap-2 w-full'>
                          <div className="relative w-full lg:w-[440px]">
                            <input
                              className={`flex w-full h-[36px] px-3 py-2 justify-between items-center rounded border ${webhookError ? 'border-red-500' : 'border-[#EBEBEB]'} text-black placeholder:text-[#737373] placeholder:text-[14px]`}
                              type="text"
                              value={gatewayConfig.webhook_url}
                              onChange={(e) => {
                                updateWebhookUrl(gatewayId, e.target.value);
                                if (webhookError) clearGatewayErrors(gatewayId);
                              }}
                              placeholder="https://your-webhook-url.com/callback"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isPopupOpen[gatewayId] && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex justify-center items-center">
                      <div className="bg-white rounded-[8px] p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-[#272727]  text-[18px] font-semibold">
                            Edit Webhook
                          </h2>
                          <button onClick={() => closePopup(gatewayId)} className="text-red-600 hover:text-red-800">
                            <SvgIcons.PopupClose />
                          </button>
                        </div>
                        <div className="mb-4">
                          <label className="text-[#626C89] mb-[8px]  text-[14px] font-normal">
                            Webhook Secret
                          </label>
                          <input
                            className={`flex w-full h-[36px] px-3 py-2 rounded border ${secretError ? 'border-red-500' : 'border-[#EBEBEB]'} text-black placeholder:text-[#737373] placeholder:text-[14px]`}
                            type="text"
                            value={tempWebhookSecret}
                            onChange={(e) => {
                              setTempWebhookSecret(e.target.value);
                              if (secretError) clearGatewayErrors(gatewayId);
                            }}
                            placeholder="xxxxxxxx"
                            disabled={isWebhookLoading[gatewayId]}
                          />
                          {secretError && (
                            <p className="text-red-600 text-xs mt-1">{secretError}</p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="text-[#626C89] mb-[8px]  text-[14px] font-normal">
                            Webhook URL
                          </label>
                          <input
                            className={`flex w-full h-[36px] px-3 py-2 rounded border ${webhookError ? 'border-red-500' : 'border-[#EBEBEB]'} text-black placeholder:text-[#737373] placeholder:text-[14px]`}
                            type="text"
                            value={tempWebhookUrl}
                            onChange={(e) => {
                              setTempWebhookUrl(e.target.value);
                              if (webhookError) clearGatewayErrors(gatewayId);
                            }}
                            placeholder="https://your-webhook-url.com/callback"
                            disabled={isWebhookLoading[gatewayId]}
                          />
                          {webhookError && (
                            <p className="text-red-600 text-xs mt-1">{webhookError}</p>
                          )}
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            className="flex h-9 px-4 py-2 justify-center items-center rounded border border-[#EBEBEB] bg-white text-[#272727]  text-sm font-medium"
                            onClick={() => closePopup(gatewayId)}
                            disabled={isWebhookLoading[gatewayId]}
                          >
                            Cancel
                          </button>
                          <button
                            className="flex h-9 px-4 py-2 justify-center items-center gap-2 rounded bg-[#124CBE] text-white  text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleUpdateWebhook(gatewayId)}
                            disabled={isWebhookLoading[gatewayId]}
                          >
                            {isWebhookLoading[gatewayId] ? (
                              <Bars
                                height="30"
                                width="30"
                                color="#fff"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                              />
                            ) : (
                              'Save'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="p-[16px] bg-white rounded-[8px] mb-[12px]">
            <div className="flex items-center justify-between mb-[16px]">
              <p className="text-[#272727]  text-[16px] font-semibold leading-[16px]">
                Activity Log
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-[#F4F5F7] text-[#272727] ">
                <thead>
                  <tr className="h-[34px] items-center flex-shrink-0">
                    <th className="px-4 py-2 text-[14px] whitespace-nowrap text-start font-medium leading-[14px] cursor-pointer">
                      S.No
                      <SvgIcons.TableArrow />
                    </th>
                    <th className="px-4 py-2 text-[14px] whitespace-nowrap text-start font-medium leading-[14px] cursor-pointer">
                      Action
                      <SvgIcons.TableArrow />
                    </th>
                    <th className="px-4 py-2 text-[14px] whitespace-nowrap text-start font-medium leading-[14px] cursor-pointer">
                      Status
                      <SvgIcons.TableArrow />
                    </th>
                    <th className="px-4 py-2 text-[14px] whitespace-nowrap text-start font-medium leading-[14px] cursor-pointer">
                      Remarks
                      <SvgIcons.TableArrow />
                    </th>
                    <th className="px-4 py-2 text-[14px] whitespace-nowrap text-start font-medium leading-[14px] cursor-pointer">
                      Created at
                      <SvgIcons.TableArrow />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {audits.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-2 text-center">
                        No activity logs available.
                      </td>
                    </tr>
                  ) : (
                    audits.map((audit:any, index) => (
                      <tr key={audit.id || index} className="h-[34px] bg-white">
                        <td className="px-4 py-2 text-[14px] font-medium leading-[14px]">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-[14px] font-medium leading-[14px]">
                          {audit.action}
                        </td>
                        <td className="px-4 py-2">
                          {audit.remarks?.toLowerCase().includes('success') ? (
                            <div className="inline-flex items-center gap-2 rounded-[4px] border border-[#23B04E] bg-[#D6FDE2] p-[6px_8px]">
                              <span className="text-[#23B04E]  text-[14px] font-medium leading-[14px]">
                                Success
                              </span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-2 rounded-[4px] border border-[#EC2020] bg-[#FEDBDB] p-[6px_8px]">
                              <span className="text-[#EC2020]  text-[14px] font-medium leading-[14px]">
                                Failed
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M8 1.5C4.41594 1.5 1.5 4.41594 1.5 8C1.5 11.5841 4.41594 14.5 8 14.5C11.5841 14.5 14.5 11.5841 14.5 8C14.5 4.41594 11.5841 1.5 8 1.5ZM10.3534 9.64656C10.4018 9.69253 10.4405 9.74772 10.4672 9.80888C10.494 9.87003 10.5082 9.93592 10.509 10.0027C10.5099 10.0694 10.4974 10.1356 10.4722 10.1974C10.4471 10.2593 10.4098 10.3154 10.3626 10.3626C10.3154 10.4098 10.2593 10.4471 10.1974 10.4722C10.1356 10.4974 10.0694 10.5099 10.0027 10.509C9.93592 10.5082 9.87003 10.494 9.80888 10.4672C9.74772 10.4405 9.69253 10.4018 9.64656 10.3534L8 8.70719L6.35344 10.3534C6.25891 10.4432 6.13303 10.4926 6.00265 10.4909C5.87227 10.4892 5.7477 10.4367 5.6555 10.3445C5.5633 10.2523 5.51076 10.1277 5.50909 9.99735C5.50742 9.86697 5.55675 9.74109 5.64656 9.64656L7.29281 8L5.64656 6.35344C5.55675 6.25891 5.50742 6.13303 5.50909 6.00265C5.51076 5.87227 5.5633 5.7477 5.6555 5.6555C5.7477 5.5633 5.87227 5.51076 6.00265 5.50909C6.13303 5.50742 6.25891 5.55675 6.35344 5.64656L8 7.29281L9.64656 5.64656C9.74109 5.55675 9.86697 5.50742 9.99735 5.50909C10.1277 5.51076 10.2523 5.5633 10.3445 5.6555C10.4367 5.7477 10.4892 5.87227 10.4909 6.00265C10.4926 6.13303 10.4432 6.25891 10.3534 6.35344L8.70719 8L10.3534 9.64656Z"
                                  fill="#EC2020"
                                />
                              </svg>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-2 text-[14px] font-medium leading-[14px]">
                          {audit.remarks || 'N/A'}
                        </td>
                        <td className="px-4 py-2 text-[14px] font-medium leading-[14px]">
                          {new Date(audit.created_at).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
  );
};

