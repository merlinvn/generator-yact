include_directories(${GTEST_INCLUDE_DIRS})

file(GLOB TEST_SRC_FILES *.cpp)
add_executable(${PROJECT_TEST_NAME} ${TEST_SRC_FILES})

add_dependencies(${PROJECT_TEST_NAME} googletest)

target_link_libraries(${PROJECT_TEST_NAME}
    ${GTEST_LIBS_DIR}/libgtest.a
    ${GTEST_LIBS_DIR}/libgtest_main.a
)
target_link_libraries(${PROJECT_TEST_NAME} ${CMAKE_THREAD_LIBS_INIT})