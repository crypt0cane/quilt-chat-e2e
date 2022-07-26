import { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useGunAccount } from "../../stores/useGunAccount";
import { generateRandomHex } from "../../helpers/generateRandomHex";
import { useGunConnection } from "../../stores/useGunConnection";
import { HashLoader } from "react-spinners";
import {
  readGunCredentials,
  storeGunCredentials,
} from "../../modules/storage/storeGunCredentials";
import { GunCredentials } from "../../types/gun/gunCredentials";
import { GunUser } from "../../types/gun/GunTypes";

interface AuthProps {}

export const Auth: React.FC<AuthProps> = memo(() => {
  const setGunLogged = useGunAccount((state) => state.setIsLogged);
  const isGunLogged = useGunAccount((state) => state.isLogged);
  const client = useGunConnection((state) => state.gunUser);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const generateGunCredentials = useCallback((): GunCredentials => {
    return {
      username: generateRandomHex(30),
      password: generateRandomHex(30),
    };
  }, []);

  const createGunAccount = useCallback(
    (client: GunUser): Promise<GunCredentials> =>
      new Promise((resolve, reject) => {
        const credentials = generateGunCredentials();
        client.create(
          credentials.username,
          credentials.password,
          (args: any) => {
            if (args.err) {
              return reject(new Error(args.err));
            }

            resolve(credentials);
          }
        );
      }),
    [generateGunCredentials]
  );

  const loginToGunAccount = useCallback(
    (client: GunUser, credentials: GunCredentials): Promise<boolean> =>
      new Promise((resolve, reject) => {
        client.auth(credentials.username, credentials.password, (args: any) => {
          if (args.err) {
            return reject(args.err);
          }

          setGunLogged(true);
          storeGunCredentials(credentials);
          toast.success("Connected successfully!");
          resolve(true);
        });
      }),
    [setGunLogged]
  );

  useEffect(() => {
    if (!client) return;
    if (isConnecting) return;

    const initializeGunAccount = async () => {
      setIsConnecting(true);
      try {
        // Check if there are saved gun account credentials
        let gunCredentials = readGunCredentials();

        // Create gun account
        if (!gunCredentials) {
          gunCredentials = await createGunAccount(client);
        }

        // Check if account has been created
        if (!gunCredentials) {
          throw new Error("Cannot create gun account, try again!");
        }

        // Login to account
        await loginToGunAccount(client, gunCredentials);
        setIsConnecting(false);
      } catch (error: any) {
        setIsConnecting(false);
        toast.error(error.message);
        console.log(error);
      }
    };

    initializeGunAccount();
  }, [
    isConnecting,
    isGunLogged,
    client,
    setGunLogged,
    generateGunCredentials,
    createGunAccount,
    loginToGunAccount,
  ]);

  return (
    <form>
      <div className="form-group flex flex-col items-center justify-center w-2/3 mt-12">
        <div className="mb-10">Connecting...</div>
        <HashLoader color="white"></HashLoader>
      </div>
    </form>
  );
});
