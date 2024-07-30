import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LogoutButton from "../elements/button/logoutButton";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { checkSessionApi } from "../../../../services/auth/checkSession";
import { loginNow, userKey } from "../Hooks/authSelector";
import { getUserKey } from "../Hooks/useMethod";
import { PermissionsState } from "../../../../store/auth/permissionSlice";
import { permissionStore } from "../Hooks/authSelector";
import { getPermission } from "../../../../store/auth/permissionSlice";
import { isLogin, isLogout } from "../../../../store/auth/isLoginSlice";
import Link from "next/link";
import { KeyState } from "../../../../store/auth/keySlice";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPath = router.pathname;
  // console.log("currentPath", currentPath);
  const nowLogin: boolean = useSelector(loginNow);
  const key: KeyState = useSelector(userKey);
  const permission: PermissionsState = useSelector(permissionStore);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const IsLoggedIn: boolean =
        localStorage.getItem("isLogin") === "true" ? true : false;
      // console.log("isLogin", IsLoggedIn);

      // console.log("headerrrrrrrrrrrr  ");
      const getPermissionData = async () => {
        try {
          await dispatch(getPermission() as any);
        } catch (e) {
          // console.log("Error", e);
          localStorage.clear();
          dispatch(isLogout());
          router.push("/error?code=401");
        }
      };

      const getKey = async () => {
        try {
          await getUserKey(dispatch);
        } catch (e) {
          // console.log("Error", e);
          localStorage.clear();
          dispatch(isLogout());
          router.push("/error?code=401");
        }
      };

      if (permission === null && IsLoggedIn) {
        getPermissionData();
      }

      // console.log("permission", permission);

      if (key === null && IsLoggedIn) {
        getKey();
      }
    }
  }, [dispatch, nowLogin]);

  useEffect(() => {
    const verifySession = async () => {
      const response: boolean = await checkSessionApi.checkSession();
      if (!response) {
        localStorage.clear();
        dispatch(isLogout());
        router.push("/error?code=401");
      } else {
        await dispatch(isLogin());
        // console.log("セッション確認済み");
      }
    };

    const IsLoggedIn: boolean =
      localStorage.getItem("isLogin") === "true" ? true : false;
    // console.log("isLogin", IsLoggedIn);

    if (IsLoggedIn) {
      isLogin();
      verifySession();
    }

    const intervalId = setInterval(verifySession, 10 * 60 * 1000); // 5分ごとにチェック

    return () => clearInterval(intervalId);
  }, [dispatch]);
  const navigation =
    currentPath === "/" ||
    currentPath === "/auth/owner" ||
    currentPath === "/auth/login" ||
    currentPath === "/auth/register" ||
    currentPath === "/_error" ||
    currentPath === "/404" ||
    currentPath === "/auth/emailWait" ||
    currentPath === "/auth/emailVerify/[id]/[hash]" ||
    currentPath === "/auth/forgotPassword" ||
    currentPath === "/auth/resetEmailWait" ||
    currentPath === "/auth/resetPassword/[token]"
      ? []
      : permission === "オーナー"
      ? [
          {
            name: "一覧",
            href: "/dashboard",
            current: currentPath === "/dashboard",
          },
          {
            name: "スタッフ",
            href: "/attendances",
            current: currentPath === "/attendances",
          },
          {
            name: "勤怠",
            href: "/attendanceTimeShots",
            current: currentPath === "/attendanceTimeShots",
          },
          {
            name: "顧客",
            href: "/customers",
            current: currentPath === "/customers",
          },
          {
            name: "予約表",
            href: "/schedules",
            current: currentPath === "/schedules",
          },
          {
            name: "在庫",
            href: "/stocks",
            current: currentPath === "/stocks",
          },
          {
            name: "コース",
            href: "/courses",
            current: currentPath === "/courses",
          },
          {
            name: "オプション",
            href: "/options",
            current: currentPath === "/options",
          },
          {
            name: "物販",
            href: "/merchandises",
            current: currentPath === "/merchandises",
          },
          {
            name: "髪型",
            href: "/hairstyles",
            current: currentPath === "/hairstyles",
          },
          {
            name: "日次売上",
            href: "/daily_sales",
            current: currentPath === "/daily_sales",
          },
          {
            name: "月次売上",
            href: "/monthly_sales",
            current: currentPath === "/monthly_sales",
          },
          {
            name: "年次売上",
            href: "/yearly_sales",
            current: currentPath === "/yearly_sales",
          },
          {
            name: "個人情報",
            href: "/userProfile/updateUserInformation",
            current: currentPath === "/userProfile/updateUserInformation",
          },
          {
            name: "店舗情報",
            href: "/userProfile/updateOwnerInfo",
            current: currentPath === "/notifications",
          },
        ]
      : permission === "マネージャー" || permission === "スタッフ"
      ? [
          {
            name: "一覧画面",
            href: "/dashboard",
            current: currentPath === "/dashboard",
          },
          {
            name: "勤怠",
            href: "/attendanceTimeShots",
            current: currentPath === "/attendanceTimeShots",
          },
          {
            name: "顧客",
            href: "/customers",
            current: currentPath === "/customers",
          },
          {
            name: "予約表",
            href: "/schedules",
            current: currentPath === "/schedules",
          },
          {
            name: "在庫",
            href: "/stocks",
            current: currentPath === "/stocks",
          },
          {
            name: "コース",
            href: "/courses",
            current: currentPath === "/courses",
          },
          {
            name: "オプション",
            href: "/options",
            current: currentPath === "/options",
          },
          {
            name: "物販",
            href: "/merchandises",
            current: currentPath === "/merchandises",
          },
          {
            name: "髪型",
            href: "/hairstyles",
            current: currentPath === "/hairstyles",
          },
          {
            name: "個人情報",
            href: "/userProfile/updateUserInformation",
            current: currentPath === "/userProfile/updateUserInformation",
          },
        ]
      : [];

  return (
    <>
      <div className="min-h-full">
        {nowLogin && (
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-2 flex justify-center ">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center ">
                      <div className="hidden md:block">
                        {/* items-baseline: 子要素のベースラインを揃える。テキストのベースラインが均等になる。 */}

                        {navigation.map((item) => (
                          <Link key={item.name} href={item.href}>
                            <span
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-blue-600 p-3 "
                                  : "text-gray-200 hover:bg-gray-700 hover:text-white",
                                "rounded-md p-3 text-md font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                            </Menu.Button>
                          </div>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <span
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0"></div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white"></div>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1 px-2">
                      <LogoutButton
                        className={
                          "block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        }
                      />
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )}
      </div>
    </>
  );
}
