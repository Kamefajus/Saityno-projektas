using ApiProjektas.Data.Entities;
using Microsoft.Extensions.Configuration;
using Pomelo.EntityFrameworkCore.MySql;
using ApiProjektas.Auth.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace ApiProjektas.Data;

public class ProjectDb : IdentityDbContext<ForumUser>
{
    private readonly IConfiguration configuration;

    public DbSet<Movie> Movies { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Session> Sessions { get; set; }
    public ProjectDb(IConfiguration configuration)
    {
        this.configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = configuration.GetConnectionString("MariaDB");
        optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    }
}
