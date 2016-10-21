#include <mpi.h>
#include <stdio.h>
#include <thread>
#include <chrono>
#include <time.h>
#include <stdlib.h>

int main(int argc, char **argv) {
    // Initialize the MPI environment
    MPI_Init(NULL, NULL);

    // Get the number of processes
    int world_size;
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);

    // Get the rank of the process
    int world_rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);

    // Get the name of the processor
    char processor_name[MPI_MAX_PROCESSOR_NAME];
    int name_len;
    MPI_Get_processor_name(processor_name, &name_len);

    // MPI_Barrier(MPI_COMM_WORLD);
    int root = 0;
    int buf = -1;
    srand(time(NULL) + world_rank);

    if (world_rank == root) {
        std::cout << "Reading input file" << std::endl;
        buf = 777;
    }

    // printf("[%d]: Before Bcast, buf is %d\n", world_rank, buf);
    // int wait =  rand()%10;
    // std::cout << "wait for: " << wait << std::endl;
    // std::this_thread::sleep_for(std::chrono::seconds(wait));

    // MPI_Barrier(MPI_COMM_WORLD);

    //broad cast intialize model
    /* everyone calls bcast, data is taken from root and ends up in everyone's buf */
    MPI_Bcast(&buf, 1, MPI_INT, root, MPI_COMM_WORLD);

    if (world_rank != root) {
        std::cout << world_rank << ": Start initializing" << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(rand() % 5));
        std::cout << world_rank << ": Initialized" << std::endl;
    }

    MPI_Barrier(MPI_COMM_WORLD);
    int b[world_size] = {};
    int total_time = 10000;
    for (int i = 0; i < total_time; i++) {
        if (world_rank != root) {
            std::cout << world_rank << ": Start time step " << i << std::endl;
            std::this_thread::sleep_for(std::chrono::seconds(rand() % 5));
            std::cout << world_rank << ": End time step " << i << std::endl;
        }
        MPI_Barrier(MPI_COMM_WORLD);

        MPI_Gather(&world_rank, 1, MPI_INT, b, 1, MPI_INT, 0, MPI_COMM_WORLD);
        if (world_rank == root) {
            for (int i = 0; i < world_size; i++) {
                std::cout << b[i] << "\t";
            }
            std::cout << std::endl;
        }
        std::this_thread::sleep_for(std::chrono::seconds(1));
        MPI_Barrier(MPI_COMM_WORLD);
    }

    // Finalize the MPI environment.
    MPI_Finalize();
}
